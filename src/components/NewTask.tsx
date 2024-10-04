import { useUiContext } from '../context/useUiContext';
import { TextField, Button, Modal, Typography, Stack, Select, MenuItem, FormControl } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Category, Task } from '../interfaces';
import { useDataContext } from '../context';
import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  title: string;
  description?: string | null; 
  category: string; 
}

interface Props{
  categories: Category[] | null;
}

const NewTask = ({ categories }:Props) => {

  const { isOpen, onChangeModal } = useUiContext();
  const { onCreateTask } = useDataContext();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '' 
    }
  });

  const onClose = () => {
    onChangeModal(false);
    reset();
  }

  const onSubmit = async(values:FormValues) => {

    const task: Task = {
        id: uuidv4(),
        title:values?.title,
        description: values?.description || '',
        category_id: values?.category,
        completed: false
    }

    await onCreateTask(task);
    onChangeModal(false); 
    reset(); 
  };

  return (
    <Modal open={isOpen} onClose={() => onChangeModal(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack 
        onSubmit={handleSubmit(onSubmit)}
        sx={{
            width: '400px', 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '22px', 
            gap:4,
        }}
        component='form'
        >
            <Stack>
                <Typography variant="h6" component="h3" color='black' fontWeight={500}>Nueva tarea</Typography>
            </Stack>
            <Stack gap={2}>
                
                <TextField autoFocus label="Título" fullWidth variant="standard"
                 {...register('title', { required: "El título es obligatorio", maxLength: { value: 40, message: 'El título no puede tener más de 40 caracteres'} })}
                 error={!!errors.title} 
                 helperText={errors.title ? (errors.title.message as string) : undefined} 
                />

                <TextField label="Descripción" fullWidth variant="standard" 
                 {...register('description', { required: false, maxLength: { value: 100, message: 'La descripción no puede tener más de 100 caracteres' } })}    
                />

                <FormControl fullWidth variant="standard" error={!!errors.category}>
                    <Select label="Categoría" fullWidth variant="standard" defaultValue="" 
                    {...register('category', { required: "La categoría es obligatoria" })} 
                    error={!!errors.category}
                    >   
                    { categories?.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>) }
                    </Select>
                    {errors.category && <Typography fontSize='12px' color="error">{errors.category.message as string}</Typography>}
                </FormControl>
            </Stack>

            <Stack width='100%' direction='row' justifyContent='end' alignItems='end' gap={1}>
              <Button onClick={onClose} sx={ (theme) => ({ minWidth:'120px', width:'max-content', paddingX:'14px', paddingY:'4px', color: theme.palette.primary.main, backgroundColor:'white', border:'1px solid', borderColor: theme.palette.primary.main})}>Cancelar</Button>
              <Button type='submit' sx={(theme) => ({minWidth:'120px', width:'max-content', paddingX:'14px', paddingY:'4px', backgroundColor: theme.palette.primary.main, color:'white', border:'1px solid', borderColor: theme.palette.primary.main})}>Crear</Button>
            </Stack>
        </Stack>
    </Modal>
  );
};

export default NewTask;
