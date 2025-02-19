export const questionSchema = [
    {
        id: "qTitle",
        label: "Question Title",
        type: "text",
        required: true,
        placeholder: "Enter question title",
        style: {
            width: "80%",

        },
    },
    {
        id: "qType",
        label: "Question Type",
        type: "select",
        options: [
            { id: "text", label: "Text" },
            { id: "description", label: "Description" },
            { id: "email", label: "Email" },
            { id: "number", label: "Number" },
            { id: "phone", label: "Phone Number" },
        ],
        required: true,
        placeholder: "Select question type",
        style: {
            width: "50%",
        },
    },
    {
        id: "extraInfo",
        label: "Additional Instruction (optional)",
        type: "text",
        required: false,
        placeholder: "Provide additional instructions (if any)",
        style: {
            width: "90%",
        },
    },
    {
        id: "qTypeTextIsParagraph",
        parent: "qType",
        parentValue: "text",
        label: "Is Paragraph",
        type: "checkbox",
        style: {
            width: "50%",

        },
    },
    {
        id: "qTypeDescriptionLength",
        parent: "qType",
        parentValue: "description",
        label: "Write a description",
        type: "textarea",
        placeholder: "description",
        style: {
            width: "100%",

        },
    },
    {
        id: "qTypeEmailFormat",
        parent: "qType",
        parentValue: "email",
        label: "Allowed Domains",
        type: "text",
        placeholder: "e.g. gmail.com, yahoo.com",
        style: {
            width: "100%",

        },
    },
    {
        id: "qTypeNumberDropdown",
        parent: "qType",
        parentValue: "number",
        label: "Number Type",
        type: "select",
        options: [
            { id: "default", label: "Default" },
            { id: "years", label: "Years" },
        ],
        required: true,
        placeholder: "Select number type",
        style: {
            width: "50%",

        },
    },
    {
        id: "qTypeNumberDefault",
        parent: "qTypeNumberDropdown",
        parentValue: "default",
        label: "Number Value",
        type: "number",
        required: true,
        placeholder: "Enter number value",
        style: {
            width: "50%",

        },
    },
    {
        id: "qTypeNumberMin",
        parent: "qTypeNumberDropdown",
        parentValue: "years",
        label: "Minimum Years",
        type: "number",
        required: true,
        min: 16,
        placeholder: "Enter minimum years",
        style: {
            width: "50%",

        },
    },
    {
        id: "qTypeNumberMax",
        parent: "qTypeNumberDropdown",
        parentValue: "years",
        label: "Maximum Years",
        type: "number",
        required: true,
        max: 28,
        placeholder: "Enter maximum years",
        style: {
            width: "50%",

        },
    },
    {
        id: "qTypePhoneFormat",
        parent: "qType",
        parentValue: "phone",
        label: "Phone Format",
        type: "text",
        placeholder: "e.g. (XXX) XXX-XXXX",
        style: {
            width: "100%",

        },
    },
];
