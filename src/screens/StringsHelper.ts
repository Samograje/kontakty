export const modes = {
    create: 'create',
    edit: 'edit',
};

export const contactLabels = [
    { label: 'Main', value: 'main' },
    { label: 'Home', value: 'home' },
    { label: 'Work', value: 'work' },
    { label: 'Fax', value: 'fax' },
    { label: 'Pager', value: 'pager' },
    { label: 'Other', value: 'other' },
    { label: 'Main', value: 'main' }, //Zostawić zawsze na końcu
];

export const defaultCathegory = contactLabels[contactLabels.length - 1].value;

export const formLabels = {
    name: 'Name',
    secondName: 'Second name',
    lastName: 'Surname',
    number: 'Number',
    email: 'Email',
};

export const icons = {
    phone: 'phone',
    email: 'email',
    user: 'account',
};
