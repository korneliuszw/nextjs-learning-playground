interface InputProps {
    label: string;
    name: string;
    type: "text";
}

export default function Input({label, name, type}: InputProps) {
    return <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input name={name} type={type} placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
    </div>
}