import React from 'react';

const Facebook = (props) => {
  if (props.mobile) {
    return (
      <a
        className="resp-sharing-button__link"
        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          props.url
        )}`}
        target="_blank"
        rel="noopener"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
          </div>
        </div>
      </a>
    );
  } else {
    return (
      <a
        className="resp-sharing-button__link"
        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          props.url
        )}`}
        target="_blank"
        rel="noopener"
        aria-label="Facebook"
      >
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
          </div>
          Facebook
        </div>
      </a>
    );
  }
};

export default Facebook;
