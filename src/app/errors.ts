interface Dictionary<T> {
    [Key: string]: T;
}

export class CustomErrors {
    private static Errors: Dictionary<string> = {
        'EMAIL_TAKEN': 'Podany adres email istnieje w bazie',
        'USERNAME_TAKEN': 'Podana nazwa użytkownika istnieje w bazie',
        'INVALID_CODE': 'Błędny kod dostępu zespołu',
    };

    public static Get(key: string): string {
        return this.Errors[key] ?? key;
    }
}