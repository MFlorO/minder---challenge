import { useUiContext } from "../context/useUiContext";
import { Stack } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

const AddTask = () => {

  const { onChangeModal } = useUiContext();

  return (
    <Stack width='100%' alignItems='end'>
        <Stack 
        sx={(theme) => ({ 
            width:'40px',
            backgroundColor: theme.palette.primary.main, 
            borderRadius: '90px', 
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor:'pointer',
            boxShadow:'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
        })}
        onClick={() => onChangeModal(true)}
        >
          <AddIcon sx={{ color: 'white' }} />
        </Stack>
    </Stack>
  )
}

export default AddTask; 