import { useState, useEffect } from "react";
import { questionSchema } from "../schemas/question.schema";
import { DYNAMIC_FORM_FIELDS } from "../constants/globalContants";
import { getLocalStorageData, setLocalStorageData } from "../apiServices/dynamicFormServices";

const LOCAL_STORAGE_KEY = "dynamicFormData";
const LOCAL_STORAGE_ERRORS_KEY = "dynamicFormErrors";


const useDynamicForm = () => {
    const [formList, setFormList] = useState([]);
    const [activeQstnId, setActiveQstnId] = useState(null)
    const [errors, setErrors] = useState([]);
    const [autoSaveLoading, setAutoSaveLoading] = useState(false);
    const [fullScreenLoading, setFullScreenLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setFullScreenLoading(true);
            const initialFormList = await getLocalStorageData(LOCAL_STORAGE_KEY);
            if (!initialFormList || initialFormList.length === 0) {
                setFormList([questionSchema[0]]);
            } else {
                setFormList(initialFormList);
            }
            setFullScreenLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        (async () => {
            await setLocalStorageData(LOCAL_STORAGE_KEY, formList);
            await setLocalStorageData(LOCAL_STORAGE_ERRORS_KEY, errors);
            setAutoSaveLoading(false);
        })();


    }, [formList, errors]);

    const handleChange = (index, fieldId, value) => {
        setActiveQstnId(index);
        const updatedFormList = [...formList];
        let updatedFormData = { ...updatedFormList[index], [fieldId]: value };

        const findChildren = (parentIds) => {
            return questionSchema
                .filter((field) => parentIds.includes(field.parent))
                .reduce((acc, field) => {
                    acc.push(field.id);
                    return acc.concat(findChildren([field.id]));
                }, []);
        };

        const childrenToRemove = findChildren([fieldId]);

        childrenToRemove.forEach((childId) => {
            delete updatedFormData[childId];
        });

        updatedFormList[index] = updatedFormData;
        setFormList(updatedFormList);

        validateField(index, fieldId, value);
        setAutoSaveLoading(true);
    };


    const validateField = (index, fieldId, value) => {
        const fieldErrors = { ...errors[index] };
        const field = questionSchema.find((f) => f.id === fieldId);

        if (field.required && !value) {
            fieldErrors[fieldId] = "This field is required";
        } else {
            delete fieldErrors[fieldId];
        }

        if (field.type === DYNAMIC_FORM_FIELDS.NUMBER) {
            const numberValue = Number(value);

            if (field.min !== undefined && numberValue < field.min) {
                fieldErrors[fieldId] = `Minimum value is ${field.min}`;
            } else if (field.max !== undefined && numberValue > field.max) {
                fieldErrors[fieldId] = `Maximum value is ${field.max}`;
            } else {
                delete fieldErrors[fieldId];
            }
        }

        const updatedErrors = [...errors];
        updatedErrors[index] = fieldErrors;
        setErrors(updatedErrors);
    };

    const addForm = () => {
        setFormList([...formList, {}]);
        setErrors([...errors, {}]);
    };

    const removeForm = (index) => {
        const updatedFormList = formList.filter((_, i) => i !== index);
        const updatedErrors = errors.filter((_, i) => i !== index);
        setFormList(updatedFormList);
        setErrors(updatedErrors);
    };

    return {
        formList,
        errors,
        handleChange,
        addForm,
        removeForm,
        activeQstnId,
        fullScreenLoading,
        autoSaveLoading
    };
};

export default useDynamicForm;
