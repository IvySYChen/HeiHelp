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
    data_list = sqlite3.connect('/Users/Princess/Desktop/scrape/heihei/database/ListingDatabase.db')
    df = pd.read_sql_query("SELECT * FROM listinginfo", data_list)

    #geolocator = Nominatim(user_agent="occolata@gmail.com")# enter your email as user_agent
    geolocator = Nominatim(user_agent="xcdwg@hotmail.com")

    #conn = sqlite3.connect('/Users/keyang/Desktop/SQL/ListingDatabase.db')
    conn = sqlite3.connect('/Users/Princess/Desktop/scrape/heihei/database/ListingDatabase.db')
    cur = conn.cursor()

    csv_prefix = '/Users/Princess/Desktop/scrape/heihei/data/' #shiyao prefix
    entries = os.listdir('/Users/Princess/Desktop/scrape/heihei/data/')

    #delete_items(conn) #if want to reload all database, uncomment it 

    for csv_file in entries:
        to_db = []
        csv_path = csv_prefix + csv_file
        if not csv_file.endswith('.csv'):
            print("skipping file {}".format(csv_file))
            continue
        with open(csv_path,'r') as table:
        #with open('/Users/Princess/Desktop/scrape/heihei/data/toronto.csv','r') as table:
            print("reading: ",csv_path)
            dr = csv.DictReader(table, delimiter=',') # comma is default delimiter
            count = 1
            for i in dr:
                address = i['address']
                city = i['city']
                full_addr = address + ' ' + city
                price = i['rate']
                type_accom = i['type_accom']
                uploaddate = datetime.datetime.today()
                school_code = i['school']
                try:
                    #geocoding for address

                    loc = geolocator.geocode(full_addr)
                    longitude = round(loc.longitude, 6)
                    latitude = round(loc.latitude,6)

                    dist = calculate_distance(latitude,longitude,school_code)
                    # generate id
                    id = school_code+str(count)
                    print(id)

                    # accomodation type change
                    type_accom = select_accom(type_accom)
                    lease_type = extract_month(i['lease_type'])
                    start_date,end_date = validate_available_date(i['start_date'],lease_type)

                    # remove dollar sign and comma
                    strPrice = re.sub('[\$+,]', '', price)
                    price = int(float(strPrice))

                    items = (id, school_code, i['name'], i['address'], i['city'], i['province'], i['postal_code'], type_accom, price, start_date,\
                            lease_type, i['url'],i['ac'], i['furnished'],i['laundry'], i['parking'],longitude, latitude,i['image_url'],dist,uploaddate,end_date)

                    to_db.append(items)
                    if len(to_db) % 20 == 0:
                        print("{} items inserted into the table".format(str(count)))
                        cur.executemany("INSERT INTO listinginfo VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", to_db)
                        to_db = []
                    count += 1
                except:
                    continue
        if to_db:
            print("{} items inserted into the table".format(count))
            cur.executemany("INSERT INTO listinginfo VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", to_db)


    conn.commit()


def delete_items(conn):
    statement= '''DELETE FROM listinginfo;'''
    cur = conn.cursor()
    cur.execute(statement)

def select_accom(x):
    if 'Duplex' in x:
        return 'House'
    if 'Condo' in x:
        return 'Apartment'
    if 'Basement' in x:
        return 'House'
    else:
        return 'Other'

def extract_month(x):
    length = x.strip(" ")
    if length[0].isdigit():
        return int(length[0])
    else:
        return 0

def add_months(sourcedate, months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = min(sourcedate.day, calendar.monthrange(year,month)[1])
    return datetime.date(year, month, day).strftime("%Y-%m-%d %H:%M:%S")

def validate_available_date(x,lease_type):
    try:
        start_date =  datetime.datetime.strptime(x, '%b %d, %Y')
        date = datetime.date(start_date.year,start_date.month,start_date.day)
        # print("date = ")
        # print(date)
        if lease_type == 0:
            end_date = add_months(date,60)
        else:
            end_date = add_months(date,lease_type)
        # print("end date = ")
        # print(end_date)
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