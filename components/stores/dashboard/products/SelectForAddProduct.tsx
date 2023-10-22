import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
        toast.error(error.response.data);
      });
  }, []);

  return (
    <>
      <Select onValueChange={updateState}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent className="overflow-y-scroll max-h-48">
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
