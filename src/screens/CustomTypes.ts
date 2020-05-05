export type numbersT = {
    category: string;
    number: string;
}[];
export type emailsT = {
    category: string;
    email: string;
}[];

export type contactT = {
    id: number | null;
    firstName: string;
    secondName: string;
    lastName: string;
    photoUrl: string;
    telNumbers: {
        category: string;
        number: string;
    }[];
    emails: {
        category: string;
        email: string;
    }[];
};

export type snackbarT = {
    isVisible: boolean;
    message: string;
    isActionVisible: boolean;
    label: string;
};

export type navigationT = {
    setOptions(param: { headerRight: () => JSX.Element; title: string }): void;
};
