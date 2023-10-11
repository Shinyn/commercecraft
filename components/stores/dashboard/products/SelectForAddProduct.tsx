import { useEffect, useState } from "react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectForAddProduct(props: any) {
  const [fetchedData, setFetchedData] = useState([]);

  const updateState = (value: string) => {
    props.valueSend(value);
  };

  useEffect(() => {
    const apiCall = props.apicall;
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${apiCall}`)
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Select onValueChange={updateState}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {fetchedData.map((item: any) => (
            <SelectItem key={item.id} value={item.title}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
