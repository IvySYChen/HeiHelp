import sqlite3
import pandas as pd
from pandas import DataFrame
import geopy
from  geopy.geocoders import Nominatim
import csv
from geopy.extra.rate_limiter import RateLimiter


geolocator = Nominatim(user_agent="xcdwg@hotmail.com")
full_addr = r"50 FortyFirst Street, Etobicoke"

loc = geolocator.geocode(full_addr)
print(loc)
longitude = loc.longitude
latitude = loc.latitude
print(longitude, latitude)
