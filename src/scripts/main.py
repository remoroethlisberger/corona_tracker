import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
import pandas as pd
import numpy as np
from create_data import create_data
from main2 import main2
import subprocess
import os


def main():
    path = "/Users/Remo/Desktop/corona_tracker/assets/"
    url = "https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html"
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

    print(datetime.now())
    req = requests.get(url, headers)

    soup = BeautifulSoup(req.text.encode(
        'utf8'), 'html.parser', from_encoding='utf8')

    table = soup.table
    new_data_found = False
    tbody = table.tbody
    df = pd.read_csv(path+'cases.csv', parse_dates=['date'])
    max_date = df['date'].max()

    for tr in tbody.find_all("tr"):
        date = None
        list_of_cases = []
        cases = 0
        for i, td in enumerate(tr.find_all("td")):
            if i == 0:
                date = td.text
                # remove any whitespace
                date = date.split("\n")[0].strip()
                if(len(date) > 8):
                    date = date[0:-2]
                date = datetime.strptime(date, "%d.%m.%y")
            if i == 1:
                newcases = td.text.split('\n')[1]
                newcases = newcases.rstrip("\n")
                newcases = newcases.strip()
                match = re.search(
                    "\(\+(?P<Number>[0-9]+)\)", newcases)
                cases = int(match.group('Number'))
            if i == 2:
                places = td.text
                for place in places.split("\n"):
                    if("Daten" not in place):
                        try:
                            place = place.strip()
                            match = re.search(
                                "(?P<Cases>[0-9]+) (?P<Place>.+)", place)
                            cases = int(match.group('Cases'))
                            place = match.group('Place')
                            list_of_cases.append(
                                {'place': place, 'cases': cases, 'date': date})
                        except Exception as identifier:
                            print(identifier)
                            pass
        if type(max_date) == float:
            print("Found new data...")
            new_data_found = True
            print(pd.DataFrame(list_of_cases))
            df = df.append(list_of_cases, ignore_index=True)
        else:
            if max_date < date:
                print("Found new data...")
                if(len(list_of_cases)):
                    new_data_found = True
                    print(pd.DataFrame(list_of_cases))
                    df = df.append(list_of_cases, ignore_index=True)
                else:
                    df = df.append(
                        {'place': 'Kanton Bern', 'cases': cases, 'date': date}, ignore_index=True)

    df = df.sort_values(by='date', ascending=False)
    df.to_csv(path + 'cases.csv', index=False, encoding='utf8')
    return new_data_found


if __name__ == "__main__":
    needs_recreation = main()
    main2()
    if needs_recreation:
        print("Deployment triggered")
        create_data()
        FNULL = open(os.devnull, 'w')
        subprocess.call(['sh', './deploy.sh'], cwd='/Users/Remo/Desktop/corona_tracker/src/scripts',
                        stdout=FNULL)
