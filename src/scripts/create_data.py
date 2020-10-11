#!/usr/bin/python
# -*- coding: utf-8 -*-


def create_data():
    import pandas as pd
    import sys
    reload(sys)
    sys.setdefaultencoding('utf-8')
    path = "/Users/Remo/Desktop/corona_tracker/assets/"

    ids = pd.read_json(path+'../src/assets/data/names_ids.json',
                       dtype=[{'name': str, 'id': int}])
    df = pd.read_csv(path+'cases.csv')

    casesbyday = df.groupby(['date']).sum()
    casesbyday = casesbyday.reset_index()
    casesbyday = casesbyday.rename(
        columns={"date": "primary", "cases": "secondary"})
    casesbyday.to_json(
        path + '../src/assets/data/dailycases.json', orient='records')

    ids.name = ids.name.astype(str)
    df.place = df.place.astype(str)
    merged = df.merge(ids, left_on='place', right_on='name')
    merged.drop(columns=['name'])
    merged.to_json(path + '../src/assets/data/BE-cases.json', orient='records')

    if(df.shape[0] != merged.shape[0]):
        print("Not all data moved over")
        print("find more details below:\n")
        t = df.merge(ids, left_on='place', right_on='name',
                     how='left', indicator=True)
        print(t[t['_merge'] == 'left_only'])
        print(merged.shape[0])


if __name__ == "__main__":
    create_data()
