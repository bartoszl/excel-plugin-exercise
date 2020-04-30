import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getCurrencies } from '../actions/currencies';
import Error from './Error';

import Button from './Button';

/*
  Generally this is a quick solution to present some styling.
  Normally much more variables would created in theme.js, so
  that changes would not require multiple places in code.
*/

const Label = styled.label`
  display: block;
  margin-bottom: 0.2rem;
`;

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
    right: 0.5rem;
    top: 0.9rem;
    position: absolute;
    pointer-events: none;
  }
`;

const Select = styled.select`
  margin-bottom: 0.25rem;
  padding: 0.5rem 2.5rem;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 400;
  background-color: transparent;
  cursor: pointer;
  position: relative;

  -moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
`;

const HelperText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #999;
  margin-bottom: 0.3rem;
  margin-top: 0;
`;

const InputGroup = styled.div`
  padding-bottom: 1.5rem;
  position: relative;
`;

const FormError = styled(Error)`
  position: absolute;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;

const CurrencyForm = ({ onSubmit, loadCurrencies, currencies, error }) => {
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
      <InputGroup>
        <Label> Select a currency from a dropdown: </Label>
        <HelperText> Please note, not all currencies may be supported. </HelperText>
        <SelectContainer>
          <Select
            name="base"
            onChange={handleChange}
            value={base}
          >
            { currencies.map((currency) => (
              <option key={currency} value={currency}>{ currency }</option>
            ))}
          </Select>
        </SelectContainer>
        <FormError> { error } </FormError>
      </InputGroup>
      <Button
        type="submit"
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
