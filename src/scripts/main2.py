import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
import pandas as pd
import numpy as np
from create_data import create_data
import subprocess
import os


def main2():
    path = "/Users/Remo/Desktop/corona_tracker/assets/"
    url = "https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html"
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

    req = requests.get(url, headers)

    soup = BeautifulSoup(req.text.encode(
        'utf8'), 'html.parser', from_encoding='utf8')

    table = soup.table
    new_data_found = False
    tbody = table.tbody
    df = pd.read_json(path+'dailycases_pull.json',
                      orient='records')
    df['primary'] = df['primary'].apply(
        lambda x: datetime.strptime(x, '%Y-%m-%d'))
    max_date = df['primary'].max()
    print(max_date)
    for tr in tbody.find_all("tr"):
        date = None
        list_of_cases = []
        for i, td in enumerate(tr.find_all("td")):
            if i == 0:
                date = td.text
                # remove any whitespace
                date = date.split("\n")[0].strip()
                if(len(date) > 8):
                    date = date[0:-2]
                date = datetime.strptime(date, "%d.%m.%y")
            if i == 1:
                newcases = td.text.split("\n")[1]
                newcases = newcases.rstrip("\n")
                newcases = newcases.strip()
                try:
                    match = re.search("\(\+(?P<Number>[0-9]+)\)", newcases)
                    cases = int(match.group('Number'))
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
                list_of_cases = pd.DataFrame(
                    [{'primary': date, 'secondary': cases}])
                df = df.append(list_of_cases, ignore_index=True)

    df = df.sort_values(by='primary', ascending=True)
    df['primary'] = df['primary'].apply(lambda x: x.strftime("%Y-%m-%d"))
    df.to_json(path + 'dailycases_pull.json', orient='records')
    df.to_json(path + '../src/assets/data/dailycases_pull.json',
               orient='records')
    return new_data_found


if __name__ == "__main__":
    needs_recreation = main2()

#    if needs_recreation:
#        print("Deployment triggered")
#        create_data()
#        FNULL = open(os.devnull, 'w')
#        subprocess.call(['sh', './deploy.sh'], cwd='/Users/Remo/Desktop/corona_tracker/src/scripts',
#                        stdout=FNULL)
