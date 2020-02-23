import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { sizes } from 'Helpers/Props';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputHelpText from 'Components/Form/FormInputHelpText';
import Link from 'Components/Link/Link';
import QualityProfileFormatItem from './QualityProfileFormatItem';
import styles from './QualityProfileFormatItems.css';

class QualityProfileFormatItems extends Component {

  //
  // Render

  render() {
    const {
      profileFormatItems,
      errors,
      warnings,
      ...otherProps
    } = this.props;

    if (profileFormatItems.length < 1) {
      return (
        <div className={styles.addCustomFormatMessage}>
          Want more control over which downloads are preferred? Add a
          <Link to='/settings/customformats'> Custom Format </Link>
        </div>
      );
    }

    return (
      <FormGroup size={sizes.EXTRA_SMALL}>
        <FormLabel size={sizes.SMALL}>
          Custom Formats
        </FormLabel>

        <div>
          <FormInputHelpText
            text="Matching Custom Formats are scored and files upgraded if a new download would improve the score"
          />

          {
            errors.map((error, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={error.message}
                  isError={true}
                  isCheckInput={false}
                />
              );
            })
          }

          {
            warnings.map((warning, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={warning.message}
                  isWarning={true}
                  isCheckInput={false}
                />
              );
            })
          }

          <div className={styles.formats}>
            <div className={styles.headerContainer}>
              <div className={styles.headerTitle}>
                Custom Format
              </div>
              <div className={styles.headerScore}>
                Score
              </div>
            </div>
            {
              profileFormatItems.sort((a, b) => ((a.score < b.score) ? 1 : -1))
                .map(({ format, name, score }, index) => {
                  return (
                    <QualityProfileFormatItem
                      key={format}
                      formatId={format}
                      name={name}
                      score={score}
                      sortIndex={index}
                      {...otherProps}
                    />
                  );
                })
            }
          </div>
        </div>
      </FormGroup>
    );
  }
}

QualityProfileFormatItems.propTypes = {
  profileFormatItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  warnings: PropTypes.arrayOf(PropTypes.object)
};

QualityProfileFormatItems.defaultProps = {
  errors: [],
  warnings: []
};

export default QualityProfileFormatItems;
