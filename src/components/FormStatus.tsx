import {z} from "zod";

interface FormStatusProps<IV extends z.ZodTypeAny> {
    result: {
        serverError?: true | undefined;
        validationError?: Partial<Record<keyof z.input<IV>, string[]>> | undefined;
        data?: any | undefined // from useAction res type declaration
    } | null,
    validationFieldMap: Record<keyof z.input<IV>, string>,
    successMessage: string
}

export default function FormStatus<const IV extends z.ZodTypeAny>({
                                                                      result,
                                                                      validationFieldMap,
                                                                      successMessage
                                                                  }: FormStatusProps<IV>) {
    if (!result) return null
    return <div className={`alert alert-${(!result.serverError && !result.validationError) ? 'success' : 'error'}`}
                role="alert">
        {(!result.serverError && !result.validationError) && <p>{successMessage}</p>}
        {result.serverError && <p>Server error</p>}
        {result.validationError && <div className={"flex flex-col items-start"}>
            {Object.keys(result.validationError).map((field) => <p
                key={field}>{validationFieldMap[field] ?? field}: {result.validationError[field].join(',')}</p>)}
        </div>}
    </div>
}