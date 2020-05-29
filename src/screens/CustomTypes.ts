export type navigationT = {
    setOptions(param: { headerRight: () => JSX.Element; title: string }): void;
};

export type validationT = {
    nameOrOneNumberEmpty: boolean;
    oneOfNumbersEmpty: boolean;
    oneOfEmailsEmpty: boolean;
};
