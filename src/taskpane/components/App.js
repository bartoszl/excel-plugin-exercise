import React, { useState } from "react";
import Progress from "./Progress";
import { getExchangeRates } from '../helpers/endpoints';
import CurrencyForm from './CurrencyForm';
import Layout from './Layout';
import { H2, H4 } from './H';
import Error from './Error';

const App = ({ title, isOfficeInitialized }) => {
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {

      const { data } = await getExchangeRates(null, values);

      await Excel.run(async context => {
        const { worksheets } = context.workbook;
        const sheet = worksheets.add(`${values.base} Exchange Rates`);
        const expensesTable = sheet.tables.add("A1:B1", true);
        expensesTable.name = `${values.base}ExchangeRates`;

        expensesTable.getHeaderRowRange().values = [["Currency", "Exchange Rate"]];

        expensesTable.rows.add(null, [
          [values.base, 1],
          ...Object.keys(data.rates).map(key => [key, data.rates[key]]),
        ]);

        if (Office.context.requirements.isSetSupported("ExcelApi", "1.2")) {
            sheet.getUsedRange().format.autofitColumns();
            sheet.getUsedRange().format.autofitRows();
        }

        sheet.activate();

        await context.sync();

        setError(null);
      });
    } catch (error) {
      if(error.code === 'ItemAlreadyExists') {
        setError(`Sheet for ${values.base} already exists.`);
      } else if(error.response) {
        setError(error.response.data.error);
      }
    }
  };

  if (!isOfficeInitialized) {
    return (
      <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
    );
  }

  return (
    <Layout>
      <H2> Exchange Rates </H2>
      <H4> A simple taskpane that lets you import currency exchange rates to your workbook! </H4>
      <CurrencyForm onSubmit={handleSubmit} error={error} />
    </Layout>
  );
}

export default App;
