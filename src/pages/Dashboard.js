import React, { useEffect, useState } from 'react';
import api from '../helpers/api';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const options = require('../assets/data/names_ids.json');

const Dashboard = (props) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const loadData = async () => {
      let r = await api.userprofile();
      if (r.data) {
        setProfile(r.data);
      }
    };

    loadData();
  }, []);

  return (
    <PageWrapper {...props}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>{t('profile')}</h4>
            <div className="bg-light py-2">
              <>
                {t('firstname')}: {profile.firstname || ''}
              </>
              <br />
              <>
                {t('lastname')}: {profile.lastname || ''}
              </>
            </div>
            <div className="mb-2">
              <Select
                value={options.filter((option) => {
                  if (profile.places) {
                    if (profile.places.indexOf(option.id) != -1) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                })}
                options={options}
                placeholder={t('select')}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                onChange={(places) => {
                  if (places) {
                    let ids = places.map((option) => {
                      return option.id;
                    });
                    setProfile((prev) => {
                      return { ...prev, places: ids };
                    });
                  } else {
                    setProfile((prev) => {
                      return { ...prev, places: [] };
                    });
                  }
                }}
                isMulti
                getOptionValue={(option) => {
                  return option.id;
                }}
              />
            </div>
            <div className="text-right">
              <button
                className="btn btn-primary"
                onClick={() => {
                  api.updateprofile(profile).then(alert(t('changes_saved')));
                }}
              >
                {t('update-btn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
