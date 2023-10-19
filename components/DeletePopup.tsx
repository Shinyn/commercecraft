import { useParams } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const DeletePopup = ({ children, item }: { children: React.ReactNode; item: string }) => {
  const { storeID } = useParams();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-2 w-full flex justify-left">Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Are you sure you want to delete this ${item}?`}</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete this
            ${item} from the server.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>{children}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePopup;
