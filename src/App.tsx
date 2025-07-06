import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {Button} from "@/components/ui/button.tsx";
import {DialogComponent} from "@/components/dialog.tsx";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import LoadingComponent from "@/components/loading.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {showToast} from "@/utils/function.ts";

export default function App() {

    //-------------- state-----------------
    const [openField, setOpenField] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [fields, setFields] = useState<string[]>([]);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const [res_data, setResData] = useState<never[]>([]);
    const [loadingField, setLoadingField] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [fieldLoading, setFieldLoading] = useState(false);
    const [newField, setNewField] = useState("");

    const [dataLoading, setDataLoading] = useState(false);

    const [search, setSearch] = useState<string>("");
    //-------------- state-----------------

    //-------------- useEffect-----------------
    useEffect(() => {
        setLoadingField(true);
        setLoadingData(true);

        fetch("http://203.154.68.166:9988/get-field", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(json => {
                if (json.status) {
                    setFields(json.data);
                    setFormData(() =>
                        Object.fromEntries(json.data.map((f: string) => [f, ""]))
                    );
                    showToast({ msg: "Loaded fields", des: "Fields loaded successfully.", type: "success" });
                } else {
                    showToast({ msg: "Failed to load fields", des: "Please check API", type: "error" });
                }
            })
            .catch(() =>
                showToast({ msg: "Network error", des: "Cannot fetch fields.", type: "error" })
            )
            .finally(() => setLoadingField(false));

        fetchData(search);
        // fetch("http://203.154.68.166:9988/get-data", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({query:search})
        // })
        //     .then(res => res.json())
        //     .then(json => {
        //         if (json.status) {
        //             setResData(json.data);
        //             showToast({ msg: "Loaded data", des: "Data loaded successfully.", type: "success" });
        //         } else {
        //             showToast({ msg: "Failed to load data", des: "Please check API", type: "error" });
        //         }
        //     })
        //     .catch(() =>
        //         showToast({ msg: "Network error", des: "Cannot fetch data.", type: "error" })
        //     )
        //     .finally(() => setLoadingData(false));
    }, []);



    //-------------- useEffect-----------------

    //-------------- function-----------------
    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const createField = () => {
        if (!newField) {
            showToast({ msg: "Field name required", des: "Please enter a field name.", type: "warning" });
            return;
        }

        setFieldLoading(true);

        fetch("http://203.154.68.166:9988/create-field", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ field: newField }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.status) {
                    setFields(prev => [...prev, newField]);
                    setFormData(prev => ({ ...prev, [newField]: "" }));
                    setNewField("");
                    setOpenField(false);
                    showToast({ msg: "Field created", des: `Field "${newField}" added successfully.`, type: "success" });
                } else {
                    showToast({ msg: "Failed to create field", des: "Server error occurred.", type: "error" });
                }
            })
            .catch(() =>
                showToast({ msg: "Network error", des: "Could not create field.", type: "error" })
            )
            .finally(() => setFieldLoading(false));
    };

    const createData = () => {
        const emptyFields = fields.filter(field => !formData[field]?.trim());

        if (emptyFields.length > 0) {
            showToast({
                msg: "Missing required fields",
                des: `Please fill in: ${emptyFields.join(", ")}`,
                type: "warning"
            });
            return;
        }

        setDataLoading(true);

        fetch("http://203.154.68.166:9988/create-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(json => {
                if (json.status) {
                    setOpenData(false);
                    setFormData(() =>
                        Object.fromEntries(fields.map(f => [f, ""]))
                    );
                    showToast({ msg: "Data added", des: "New record saved successfully.", type: "success" });

                    return fetch("http://203.154.68.166:9988/get-data", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                    });
                } else {
                    showToast({ msg: "Failed to save data", des: "Please try again.", type: "error" });
                }
            })
            .then(res => res?.json())
            .then(json => {
                if (json?.status) {
                    setResData(json.data);
                }
            })
            .catch(() =>
                showToast({ msg: "Network error", des: "Failed to save or fetch data.", type: "error" })
            )
            .finally(() => setDataLoading(false));
    };
    const fetchData = (query = "") => {
        setLoadingData(true);

        fetch("http://203.154.68.166:9988/get-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        })
            .then(res => res.json())
            .then(json => {
                if (json.status) {
                    setResData(json.data);
                } else {
                    showToast({ msg: "Failed to load data", des: "Please check API", type: "error" });
                }
            })
            .catch(() =>
                showToast({ msg: "Network error", des: "Cannot fetch data.", type: "error" })
            )
            .finally(() => setLoadingData(false));
    };

    //-------------- function-----------------



    return (
        <div className={"p-4"}>
           <div className={"flex flex-row justify-between"}>
               <div className={"flex flex-row gap-2"}>
                   <Label >Search</Label>
                   <Input
                       name="search"
                       value={search}
                       placeholder="searching here..."
                       onChange={(e) => {
                           const value = e.target.value;
                           setSearch(value);
                       }}
                   />
                   <Button onClick={()=>fetchData(search)}>Search</Button>
               </div>
               <div className={"flex flex-row gap-2"}>
                   <Button className={"rounded-md cursor-pointer"} onClick={() => setOpenField(true)}>Add Column</Button>
                   <Button className={"rounded-md cursor-pointer"} onClick={()=>setOpenData(true)}>Add Data</Button>
               </div>
           </div>

            {loadingField || loadingData ? (
                <div className="py-10 text-center text-gray-500">
                    <LoadingComponent />
                </div>
            ) : (
                <Table>
                    <TableCaption>A list of data from file-data.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {fields?.map((field:string,key:number) => (
                                <TableHead key={key} className="w-[100px]">{field}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {res_data.map((item, key:number) => (
                            <TableRow key={key}>
                                {fields.map((field, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {item[field as keyof typeof item] ?? ""}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <DialogComponent
                isOpen={openField}
                onClose={() => setOpenField(false)}
                onClick={createField}
                title="Edit Profile"
                isLoading={fieldLoading}
                des={"Create new field"}
            >
                <div className="grid gap-3 ">
                    <Label htmlFor="name-1">Field name</Label>
                    <Input  name="newField"
                            placeholder="Enter Field name..."
                            value={newField}
                            onChange={(e) => setNewField(e.target.value)}/>
                </div>
            </DialogComponent>

            <DialogComponent
                isOpen={openData}
                onClose={() => setOpenData(false)}
                onClick={createData}
                title="Create Data"
                isLoading={dataLoading}
                des="Create new Data"
            >
                <div className="grid gap-3">
                    {fields.map((field) => (
                        <div key={field} className="grid gap-1">
                            <Label htmlFor={field}>{field}</Label>
                            <Input
                                name={field}
                                placeholder={`Enter ${field}...`}
                                value={formData[field] || ""}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </DialogComponent>
            <Toaster richColors position="bottom-right" />
        </div>
    )
}
