import Card from 'components/card/Card';
import ValidationMessage from 'components/validation-message';
import IDataValidation from 'interfaces/iDataValidation';
import React from 'react';
import styles from './form.module.css';

interface FormProps {
  addNewCards: (newCard: JSX.Element) => void;
}

interface FormState {
  formOptionsValidation: {
    isNameInputValid: boolean;
    isGenderInputValid: boolean;
    isOriginInputValid: boolean;
    isLocationInputValid: boolean;
    isDateOfCreationInputValid: boolean;
    isAvatarInputValid: boolean;
    isAgreementCheckboxValid: boolean;
  };
  isCardCreationSuccessful: boolean;
}

class Form extends React.Component<FormProps, FormState> {
  submitButton: React.RefObject<HTMLButtonElement>;
  form: React.RefObject<HTMLFormElement>;
  nameInput: React.RefObject<HTMLInputElement>;
  statusSelect: React.RefObject<HTMLSelectElement>;
  speciesSelect: React.RefObject<HTMLSelectElement>;
  genderInput: React.RefObject<HTMLInputElement>;
  originInput: React.RefObject<HTMLInputElement>;
  locationInput: React.RefObject<HTMLInputElement>;
  dateOfCreationInput: React.RefObject<HTMLInputElement>;
  avatarInput: React.RefObject<HTMLInputElement>;
  agreementCheckbox: React.RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);
    this.state = {
      formOptionsValidation: {
        isNameInputValid: true,
        isGenderInputValid: true,
        isOriginInputValid: true,
        isLocationInputValid: true,
        isDateOfCreationInputValid: true,
        isAvatarInputValid: true,
        isAgreementCheckboxValid: true,
      },
      isCardCreationSuccessful: false,
    };
    this.submitButton = React.createRef();
    this.form = React.createRef();
    this.nameInput = React.createRef();
    this.statusSelect = React.createRef();
    this.speciesSelect = React.createRef();
    this.genderInput = React.createRef();
    this.originInput = React.createRef();
    this.locationInput = React.createRef();
    this.dateOfCreationInput = React.createRef();
    this.avatarInput = React.createRef();
    this.agreementCheckbox = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
    this.dataValidation = this.dataValidation.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.changeSubmitButtonStatus = this.changeSubmitButtonStatus.bind(this);
    this.hideSuccessfulCardCreationMessage = this.hideSuccessfulCardCreationMessage.bind(this);
  }

  handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const validationResponse = this.dataValidation();

    if (!validationResponse) {
      this.changeSubmitButtonStatus(true);
      return;
    }

    const {
      currentNameValue,
      currentStatusValue,
      currentSpeciesValue,
      currentGenderValue,
      currentOriginValue,
      currentLocationValue,
      currentDateOfCreationValue,
      currentAvatarValue,
    } = validationResponse;

    const newCard = (
      <Card
        name={currentNameValue}
        status={currentStatusValue}
        species={currentSpeciesValue}
        gender={currentGenderValue}
        origin={{ name: currentOriginValue }}
        location={{ name: currentLocationValue }}
        image={window.URL.createObjectURL(currentAvatarValue[0])}
        created={currentDateOfCreationValue}
        key={currentNameValue}
      />
    );

    this.props.addNewCards(newCard);
    this.handleResetBtnClick(e);
    this.setState({
      isCardCreationSuccessful: true,
    });
    this.hideSuccessfulCardCreationMessage();
  }

  handleResetBtnClick(e: React.SyntheticEvent) {
    e.preventDefault();

    this.setState({
      formOptionsValidation: {
        isNameInputValid: true,
        isGenderInputValid: true,
        isOriginInputValid: true,
        isLocationInputValid: true,
        isDateOfCreationInputValid: true,
        isAvatarInputValid: true,
        isAgreementCheckboxValid: true,
      },
      isCardCreationSuccessful: false,
    });

    this.changeSubmitButtonStatus(true);
    this.form.current?.reset();
  }

  dataValidation(): IDataValidation | null {
    const currentNameValue = this.nameInput.current?.value;
    const currentStatusValue = this.statusSelect.current?.value;
    const currentSpeciesValue = this.speciesSelect.current?.value;
    const currentGenderValue = this.genderInput.current?.value;
    const currentOriginValue = this.originInput.current?.value;
    const currentLocationValue = this.locationInput.current?.value;
    const currentDateOfCreationValue = this.dateOfCreationInput.current?.value;
    const currentAvatarValue = this.avatarInput.current?.files;
    const currentAgreementValue = this.agreementCheckbox.current?.checked;

    this.setState({
      formOptionsValidation: {
        isNameInputValid: !!currentNameValue?.length,
        isGenderInputValid: !!currentGenderValue?.length,
        isOriginInputValid: !!currentOriginValue?.length,
        isLocationInputValid: !!currentLocationValue?.length,
        isDateOfCreationInputValid: !!currentDateOfCreationValue?.length,
        isAvatarInputValid: !!currentAvatarValue?.length,
        isAgreementCheckboxValid: !!currentAgreementValue,
      },
    });

    const isInputValid = !!(
      currentNameValue?.length &&
      currentStatusValue?.length &&
      currentSpeciesValue?.length &&
      currentGenderValue?.length &&
      currentOriginValue?.length &&
      currentLocationValue?.length &&
      currentDateOfCreationValue?.length &&
      currentAvatarValue?.length &&
      currentAgreementValue
    );

    if (!isInputValid) return null;

    return {
      currentNameValue,
      currentStatusValue,
      currentSpeciesValue,
      currentGenderValue,
      currentOriginValue,
      currentLocationValue,
      currentDateOfCreationValue,
      currentAvatarValue,
    };
  }

  hideSuccessfulCardCreationMessage() {
    setTimeout(() => {
      this.setState({
        isCardCreationSuccessful: false,
      });
    }, 2000);
  }

  changeSubmitButtonStatus(isDisabled: boolean) {
    if (!this.submitButton.current) return;

    this.submitButton.current.disabled = isDisabled;
  }

  handleFormChange() {
    const isInitialState = Object.values(this.state.formOptionsValidation).every((value) => value);

    if (!isInitialState) {
      const validationResponse = this.dataValidation();

      if (validationResponse) {
        this.changeSubmitButtonStatus(false);
      }

      return;
    }

    this.changeSubmitButtonStatus(false);
  }

  render() {
    return (
      <form
        className={styles['form']}
        ref={this.form}
        onSubmit={this.handleSubmit}
        onInput={this.handleFormChange}
        data-testid={'form'}
      >
        <div className={styles['character-name']}>
          <label className={styles['character-name-label']} htmlFor="character-name">
            Enter your character name
          </label>
          <input
            className={`${styles['character-name-input']} ${
              styles[this.state.formOptionsValidation.isNameInputValid ? 'input' : 'input-invalid']
            }`}
            type="text"
            ref={this.nameInput}
            data-testid={'character-name'}
          />
          <ValidationMessage
            isValid={this.state.formOptionsValidation.isNameInputValid}
            message={'Name should contain at least 1 character'}
          />
        </div>
        <div className={styles['character-status']}>
          <label className={styles['character-status-label']} htmlFor="character-status">
            Choose your character status
          </label>
          <select
            className={`${styles['character-status-select']} ${styles['input']}`}
            ref={this.statusSelect}
            data-testid={'character-status'}
          >
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className={styles['character-species']}>
          <label className={styles['character-species-label']} htmlFor="character-species">
            Choose your character species
          </label>
          <select
            className={`${styles['character-species-select']} ${styles['input']}`}
            ref={this.speciesSelect}
            data-testid={'character-species'}
          >
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
          </select>
        </div>
        <div className={styles['character-gender']}>
          <label className={styles['character-gender-label']} htmlFor="character-gender">
            Enter your character gender
          </label>
          <input
            className={`${styles['character-gender-input']} ${
              styles[
                this.state.formOptionsValidation.isGenderInputValid ? 'input' : 'input-invalid'
              ]
            }`}
            type="text"
            ref={this.genderInput}
            data-testid={'character-gender'}
          />
          <ValidationMessage
            isValid={this.state.formOptionsValidation.isGenderInputValid}
            message={'This field must not be empty'}
          />
        </div>
        <div className={styles['character-origin']}>
          <label className={styles['character-origin-label']} htmlFor="character-origin">
            Enter where are your character from
          </label>
          <input
            className={`${styles['character-origin-input']} ${
              styles[
                this.state.formOptionsValidation.isOriginInputValid ? 'input' : 'input-invalid'
              ]
            }`}
            type="text"
            ref={this.originInput}
            data-testid={'character-origin'}
          />
          <ValidationMessage
            isValid={this.state.formOptionsValidation.isOriginInputValid}
            message={'This field must not be empty'}
          />
        </div>
        <div className={styles['character-location']}>
          <label className={styles['character-location-label']} htmlFor="character-location">
            Enter your character current location
          </label>
          <input
            className={`${styles['character-location-input']} ${
              styles[
                this.state.formOptionsValidation.isLocationInputValid ? 'input' : 'input-invalid'
              ]
            }`}
            type="text"
            ref={this.locationInput}
            data-testid={'character-location'}
          />
          <ValidationMessage
            isValid={this.state.formOptionsValidation.isLocationInputValid}
            message={'This field must not be empty'}
          />
        </div>
        <div className={styles['character-date-of-creation']}>
          <label
            className={styles['character-date-of-creation-label']}
            htmlFor="character-date-of-creation"
          >
            Choose when your character was created
          </label>
          <input
            className={`${
              styles[
                this.state.formOptionsValidation.isDateOfCreationInputValid
                  ? 'character-date-of-creation-input'
                  : 'character-date-of-creation-input-invalid'
              ]
            }`}
            type="date"
            ref={this.dateOfCreationInput}
            data-testid={'character-date'}
          />
          <ValidationMessage
            isValid={this.state.formOptionsValidation.isDateOfCreationInputValid}
            message={'Pick the date, please'}
          />
        </div>
        <div className={styles['character-avatar']}>
          <label className={styles['character-avatar-label']} htmlFor="character-avatar">
            Upload your character avatar
          </label>
          <input
            className={`${
              styles[
                this.state.formOptionsValidation.isAvatarInputValid
                  ? 'character-avatar-input'
                  : 'character-avatar-input-invalid'
              ]
            }`}
            type="file"
            multiple={false}
            accept="image/*"
            ref={this.avatarInput}
            data-testid={'character-avatar'}
          />
          <ValidationMessage
            isValid={this.state.formOptionsValidation.isAvatarInputValid}
            message={'Upload photo, please'}
          />
        </div>
        <div className={styles['agreement']}>
          Agree to data processing
          <label className={styles['agreement-label']}>
            <input
              className={styles['agreement-input']}
              type="checkbox"
              ref={this.agreementCheckbox}
              data-testid={'agreement'}
            />
            <span className={styles['switch']} />
          </label>
          <ValidationMessage
            isValid={this.state.formOptionsValidation.isAgreementCheckboxValid}
            message={'You must agree to the processing of data in order to continue'}
          />
        </div>
        <div className={styles['btns-container']}>
          <button
            className={styles['submit-btn']}
            disabled
            type="submit"
            ref={this.submitButton}
            data-testid={'submit-btn'}
          >
            Create
          </button>
          <button
            className={styles['reset-btn']}
            type="reset"
            onClick={this.handleResetBtnClick}
            data-testid={'reset-btn'}
          >
            Clear
          </button>
          <div
            className={
              styles[
                `${
                  this.state.isCardCreationSuccessful ? 'success-message-active' : 'success-message'
                }`
              ]
            }
          >
            Success. New character was created!
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
