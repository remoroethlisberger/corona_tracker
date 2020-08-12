import React from 'react';

const LinkedIn = (props) => {
  if (props.mobile) {
    return (
      <a
        className="resp-sharing-button__link"
        href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
          props.url
        )}&amp;title=${props.subject};summary=${
          props.body
        }&amp;source=${encodeURIComponent(props.url)}`}
        target="_blank"
        rel="noopener"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" />
            </svg>
          </div>
        </div>
      </a>
    );
  } else {
    return (
      <a
        className="resp-sharing-button__link"
        href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
          props.url
        )}&amp;title=${props.subject};summary=${
          props.body
        }&amp;source=${encodeURIComponent(props.url)}`}
        target="_blank"
        rel="noopener"
        aria-label="LinkedIn"
      >
        <div className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" />
            </svg>
          </div>
          LinkedIn
        </div>
      </a>
    );
  }
};

export default LinkedIn;
