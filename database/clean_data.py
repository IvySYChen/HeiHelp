import os
import re
import sqlite3
import csv
import pandas as pd
from pandas import DataFrame
import geopy
from  geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
from geopy import distance
import datetime
import calendar

def main():

    #data_list = sqlite3.connect('/Users/keyang/Desktop/SQL/ListingDatabase.db') 
    data_list = sqlite3.connect('/Users/Princess/Desktop/scrape/heihei/database/Listing.db')
    #df = pd.read_sql_query("SELECT * FROM listinginfo", data_list)

    #geolocator = Nominatim(user_agent="occolata@gmail.com")# enter your email as user_agent
    geolocator = Nominatim(user_agent="xcdwg@hotmail.com")

    #conn = sqlite3.connect('/Users/keyang/Desktop/SQL/ListingDatabase.db')
    conn = sqlite3.connect('/Users/Princess/Desktop/scrape/heihei/database/Listing.db')
    cur = conn.cursor()

    # csv_prefix = '/Users/Princess/Desktop/scrape/heihei/data/' #shiyao prefix
    # entries = os.listdir('/Users/Princess/Desktop/scrape/heihei/data/')

    delete_items(conn) #if want to reload all database, uncomment it 

    # for csv_file in entries:
    to_db = []
    csv_path = './Listing - Form responses 1.csv'
    # if not csv_file.endswith('.csv'):
    #     print("skipping file {}".format(csv_file))
    #     continue
    with open(csv_path,'r') as table:
    #with open('/Users/Princess/Desktop/scrape/heihei/data/toronto.csv','r') as table:
        print("reading: ",csv_path)
        dr = csv.DictReader(table, delimiter=',') # comma is default delimiter
        count = 1
        for i in dr:
            name = i['Listing Name']
            address = i['Street Address']
            city = i['City']
            province = i['Province']
            postal_code = i['Postal Code']
            full_addr = address + ' ' + city
            email = i['Email']
            price = i['Price']
            type_accom = i['Type of Accommodation']
            uploaddate = datetime.datetime.today()
            type_accom = i['Type of Accommodation']
            school_code = select_school_code(i['School Name'])
            price = i['Price']
            start_date = i['Availability ']
            lease_type = int(i['Lease length '])
            ac = bool_check(i['Facilities [Air Conditioning]'])
            furnished = bool_check(i['Facilities [Furnished]'])
            laundry = bool_check(i['Facilities [Laundry]'])
            parking = bool_check(i['Facilities [Parking]'])
            image_url = i['Listing Photo']

            #try:
                #geocoding for address

            loc = geolocator.geocode(full_addr)
            longitude = round(loc.longitude, 6)
            latitude = round(loc.latitude,6)
            dist = calculate_distance(latitude,longitude,school_code)

            
            id = school_code+str(count)
            print(id)
            # accomodation type change
            start_date,end_date = validate_date(start_date,lease_type)
            #print(start_date)
            items = (id, school_code, email, name, address, city, province, postal_code, \
                    type_accom, price, start_date,lease_type,ac, furnished,laundry, parking,\
                    longitude, latitude,image_url,dist,uploaddate,end_date)

            to_db.append(items)
            # except:
            #     continue
            count += 1
        cur.executemany("INSERT INTO listinginfo VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", to_db)
    conn.commit()

def bool_check(facility):
    if facility:
        return 0
    else:
        return 1
def select_school_code(school):
    shcool_dic = {"University of Toronto St. George":"UTSU","Ryerson University":"RU"}
    return shcool_dic[school]

def delete_items(conn):
    statement= '''DELETE FROM listinginfo;'''
    cur = conn.cursor()
    cur.execute(statement)

# def extract_month(x):
#     length = x.strip(" ")
#     if length[0].isdigit():
#         return int(length[0])
#     else:
#         return 0

def add_months(sourcedate, months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = min(sourcedate.day, calendar.monthrange(year,month)[1])
    return datetime.date(year, month, day).strftime("%Y-%m-%d %H:%M:%S")

def validate_date(x,lease_type):
    try:
        start_date = datetime.datetime.strptime(x, '%d/%m/%Y')
        date = datetime.date(start_date.year,start_date.month,start_date.day)

        end_date = add_months(date,lease_type)
        return start_date,end_date
    except:
        return 0,0

def calculate_distance(latitude,longitude,school_code):

    sch_dic = {"UTSU":(43.656997, -79.390331), "RU":(43.654639, -79.374772), "EB":(43.697302, -79.392785),\
                "ACHBE":(43.707320, -79.397621),"CSL":(43.647625, -79.396987)}
    sch_coord = sch_dic[school_code]
    listing_coord = (latitude,longitude)
    dist = distance.distance(sch_coord,listing_coord).km
    return round(dist,3)

if __name__ == "__main__":
    main()
