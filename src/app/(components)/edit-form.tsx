"use client";
import * as React from "react";
// components
import Link from "next/link";

// utils
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { newContact } from "~/app/(actions)/contacts";

// types
import type { Contact } from "~/lib/schema/contact.sql";

type EditFormProps = {
    contact?: Contact;
};

export function EditForm({ contact }: EditFormProps) {
    const [state, formAction] = useFormState(newContact, {
        message: null,
    });

    return (
        <>
            <form id="contact-form" action={formAction}>
                <p>
                    <span>Name</span>
                    <input
                        placeholder="First"
                        aria-label="First name"
                        type="text"
                        name="first"
                        defaultValue={contact?.first ?? ""}
                    />
                    <input
                        placeholder="Last"
                        aria-label="Last name"
                        type="text"
                        name="last"
                        defaultValue={contact?.last ?? ""}
                    />
                </p>
                <label>
                    <span>Github handle</span>
                    <div className="inline-flex flex-col w-full pl-6">
                        <input
                            type="text"
                            name="github_handle"
                            placeholder="ex: fredkiss3"
                            defaultValue={contact?.github_handle ?? ""}
                            aria-describedby={`github-handle-error`}
                            className={`border rounded-md p-2 ${
                                state?.type === "error" &&
                                state?.errors?.github_handle
                                    ? "border-red-400"
                                    : ""
                            }`}
                        />

                        {state?.type === "error" &&
                            state?.errors?.github_handle && (
                                <p
                                    id="github-handle-error"
                                    className="!ml-0 text-red-400 w-full inline-flex self-stretch"
                                >
                                    {state.errors.github_handle[0]}
                                </p>
                            )}
                    </div>
                </label>
                <label>
                    <span>Avatar URL</span>
                    <div className="inline-flex flex-col w-full pl-6">
                        <input
                            placeholder="https://example.com/avatar.jpg"
                            aria-label="Avatar URL"
                            type="text"
                            name="avatar_url"
                            defaultValue={contact?.avatar ?? ""}
                            aria-describedby={`avatar-url-error`}
                            className={`border rounded-md p-2 ${
                                state?.type === "error" &&
                                state?.errors?.avatar_url
                                    ? "border-red-400"
                                    : ""
                            }`}
                        />

                        {state?.type === "error" &&
                            state?.errors?.avatar_url && (
                                <p
                                    id="avatar-url-error"
                                    className="!ml-0 text-red-400 w-full inline-flex self-stretch"
                                >
                                    {state.errors.avatar_url[0]}
                                </p>
                            )}
                    </div>
                </label>
                <label>
                    <span>Notes</span>
                    <textarea
                        name="notes"
                        defaultValue={contact?.notes ?? ""}
                        rows={6}
                    />
                </label>
                <p>
                    <SubmitButton />

                    {contact?.id !== undefined && (
                        <>
                            <input type="hidden" name="id" value={contact.id} />

                            <Link
                                href={`/contacts/${contact.id}`}
                                className="button"
                            >
                                Cancel
                            </Link>
                        </>
                    )}
                </p>
            </form>
        </>
    );
}

function SubmitButton() {
    const { pending: isPending } = useFormStatus();
    return (
        <button type="submit" disabled={isPending} className={`edit-button`}>
            {isPending ? "saving..." : "Save"}
        </button>
    );
}
