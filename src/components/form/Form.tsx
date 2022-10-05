import React from 'react';
import styles from './form.module.css';

class Form extends React.Component<
  Record<string, never>,
  {
    formOptionsValidation: {
      isNameInputValid: boolean;
      isGenderInputValid: boolean;
      isOriginInputValid: boolean;
      isLocationInputValid: boolean;
      isDateOfCreationInputValid: boolean;
      isAvatarInputValid: boolean;
      isAgreementCheckboxValid: boolean;
    };
  }
> {
  nameInput: React.RefObject<HTMLInputElement>;
  statusSelect: React.RefObject<HTMLSelectElement>;
  speciesSelect: React.RefObject<HTMLSelectElement>;
  genderInput: React.RefObject<HTMLInputElement>;
  originInput: React.RefObject<HTMLInputElement>;
  locationInput: React.RefObject<HTMLInputElement>;
  dateOfCreationInput: React.RefObject<HTMLInputElement>;
  avatarInput: React.RefObject<HTMLInputElement>;
  agreementCheckbox: React.RefObject<HTMLInputElement>;

  constructor(props: Record<string, never>) {
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
    };
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
  }

  handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (
      !this.nameInput.current ||
      !this.statusSelect.current ||
      !this.speciesSelect.current ||
      !this.genderInput.current ||
      !this.originInput.current ||
      !this.locationInput.current ||
      !this.dateOfCreationInput.current ||
      !this.avatarInput.current ||
      !this.agreementCheckbox.current
    ) {
      return;
    }

    const state = {
      ...this.state.formOptionsValidation,
    };

    const currentOptionValue = !!this.nameInput.current.value.length;

    this.setState({
      formOptionsValidation: {
        ...state,
        isNameInputValid: currentOptionValue,
      },
    });

    alert('Отправленное имя: ' + this.nameInput.current.value.length);
    // alert('Отправленное имя: ' + this.statusSelect.current.value);
    // alert('Отправленное имя: ' + this.speciesSelect.current.value);
    // alert('Отправленное имя: ' + this.genderInput.current.value);
    // alert('Отправленное имя: ' + this.originInput.current.value);
    // alert('Отправленное имя: ' + this.locationInput.current.value);
    // alert('Отправленное имя: ' + this.dateOfCreationInput.current.value);
    // alert('Отправленное имя: ' + this.avatarInput.current.files);
    // alert('Отправленное имя: ' + this.agreementCheckbox.current.checked);
  }

  // componentDidUpdate(
  //   _: Readonly<Record<string, never>>,
  //   prevState: Readonly<{
  //     formOptionsValidation: {
  //       isNameInputValid: boolean;
  //       isGenderInputValid: boolean;
  //       isOriginInputValid: boolean;
  //       isLocationInputValid: boolean;
  //       isDateOfCreationInputValid: boolean;
  //       isAvatarInputValid: boolean;
  //       isAgreementCheckboxValid: boolean;
  //     };
  //   }>
  // ) {
  //   if (this.state.formOptionsValidation !== prevState.formOptionsValidation) {
  //     console.log('updated');
  //   }
  // }

  render() {
    return (
      <form className={styles['form']}>
        <div className={styles['character-name']}>
          <label className={styles['character-name-label']} htmlFor="character-name">
            Enter your character name
          </label>
          <input
            className={`${styles['character-name-input']} ${styles.input}`}
            type="text"
            name="character-name"
            ref={this.nameInput}
          />
          {!this.state.formOptionsValidation.isNameInputValid && (
            <div className={styles['error']}></div>
          )}
        </div>
        <div className={styles['character-status']}>
          <label className={styles['character-status-label']} htmlFor="character-status">
            Choose your character status
          </label>
          <select
            className={`${styles['character-status-select']} ${styles.input}`}
            defaultValue="Alive"
            name="character-status"
            ref={this.statusSelect}
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
            className={`${styles['character-species-select']} ${styles.input}`}
            defaultValue="Human"
            name="character-species"
            ref={this.speciesSelect}
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
            className={`${styles['character-gender-input']} ${styles.input}`}
            type="text"
            name="character-gender"
            ref={this.genderInput}
          />
        </div>
        <div className={styles['character-origin']}>
          <label className={styles['character-origin-label']} htmlFor="character-origin">
            Enter where are your character from
          </label>
          <input
            className={`${styles['character-origin-input']} ${styles.input}`}
            type="text"
            name="character-origin"
            ref={this.originInput}
          />
        </div>
        <div className={styles['character-location']}>
          <label className={styles['character-location-label']} htmlFor="character-location">
            Enter your character current location
          </label>
          <input
            className={`${styles['character-location-input']} ${styles.input}`}
            type="text"
            name="character-location"
            ref={this.locationInput}
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
            className={styles['character-date-of-creation-input']}
            type="date"
            name="character-date-of-creation"
            ref={this.dateOfCreationInput}
          />
        </div>
        <div className={styles['character-avatar']}>
          <label className={styles['character-avatar-label']} htmlFor="character-avatar">
            Upload your character avatar
          </label>
          <input
            className={styles['character-avatar-input']}
            type="file"
            name="character-avatar"
            ref={this.avatarInput}
          />
        </div>
        <div className={styles['agreement']}>
          Agree to data processing
          <label className={styles['agreement-label']}>
            <input
              className={styles['agreement-input']}
              type="checkbox"
              ref={this.agreementCheckbox}
            />
            <span className={styles['switch']} />
          </label>
        </div>
        <div className={styles['btns-container']}>
          <button
            // className={styles['submit-btn-disabled']}
            // disabled={true}
            className={styles['submit-btn']}
            type="submit"
            onClick={this.handleSubmit}
          >
            Create
          </button>
          <button className={styles['reset-btn']} type="reset">
            Clear
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
