import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
import pandas as pd
import numpy as np
from create_data import create_data
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
        for i, td in enumerate(tr.find_all("td")):
            if i == 0:
                date = td.text
                # remove any whitespace
                date = date.split("\n")[0].strip()
                date = datetime.strptime(date, "%d.%m.%y")
            if i == 2:
                places = td.text
                for place in places.split("\n"):
                    if("Daten" not in place):
                        try:
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
                new_data_found = True
                print(pd.DataFrame(list_of_cases))
                df = df.append(list_of_cases, ignore_index=True)

    df = df.sort_values(by='date', ascending=False)
    df.to_csv(path + 'cases.csv', index=False, encoding='utf8')
    return new_data_found


if __name__ == "__main__":
    needs_recreation = main()

    if needs_recreation:
        print("Deployment triggered")
        create_data()
        FNULL = open(os.devnull, 'w')
        subprocess.call(['sh', './deploy.sh'], cwd='/Users/Remo/Desktop/corona_tracker/src/scripts',
                        stdout=FNULL)
