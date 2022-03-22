const withContinentOptions = (component) => {
  const Component = component;
  return ({ ...props }) => {
    const options = [
      {
        value: 'North America',
        label: 'North America'
      },
      {
        value: 'Africa',
        label: 'Africa'
      },
      {
        value: 'Europe',
        label: 'Europe'
      },
      {
        value: 'Asia',
        label: 'Asia'
      },
      {
        value: 'South/Central America',
        label: 'South/Central America'
      }
    ];

    return <Component {...props} options={options} />;
  };
};

export default withContinentOptions;
