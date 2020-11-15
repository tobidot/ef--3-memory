export interface Collection<TYPE> {
    [name: string]: TYPE | Collection<TYPE>;
}