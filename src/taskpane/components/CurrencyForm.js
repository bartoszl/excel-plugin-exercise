import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonType } from "office-ui-fabric-react";
import { getCurrencies } from '../actions/currencies';

const CurrencyForm = ({ onSubmit, loadCurrencies, currencies }) => {
  const [base, setBase] = useState('');

  useEffect(() => {
    loadCurrencies();
  }, []);

  const handleChange = (e) => {
    setBase(e.target.value.toUpperCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ base })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label> Type in currency code (for instance USD): </label>
      <div>
        <select
          name="base"
          onChange={handleChange}
          value={base}
        >
          { currencies.map((currency) => (
            <option key={currency} value={currency}>{ currency }</option>
          ))}
        </select>
      </div>
      <Button
        className="ms-welcome__action"
        type="submit"
        buttonType={ButtonType.hero}
        iconProps={{ iconName: "ChevronRight" }}
      >
        Get exchange rates!
      </Button>
    </form>
  )
}

CurrencyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ currencies }) => ({
  currencies: currencies.records,
  isFetchingCurrencies: currencies.isFetching,
  currenciesError: currencies.error,
});

const mapDispatchToProps = dispatch => ({
  loadCurrencies: () => dispatch(getCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyForm);
