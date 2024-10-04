import { useState, createContext, useContext } from "react";

interface ContextUiProps {
    isOpen: boolean;
    onChangeModal: (value: boolean) => void
}

export const UiContext = createContext({} as ContextUiProps)


export const UiProvider = ({ children }: { children: React.ReactNode }) => {

    const [isOpen, setIsOpen] = useState(false)
    const onChangeModal = (value:boolean) => setIsOpen(value)
    
  return <UiContext.Provider value={{ isOpen, onChangeModal }}>{children}</UiContext.Provider>
};

export const useUiContext = () => {   

  const Context = useContext(UiContext);

  if (Context === undefined){
    throw Error('Esta fuera del contexto')
  }

  return Context;
}