import{create} from 'zustand';

interface NewsInterface
{
    header:string;
    setHeader:(header:string)=>void;
};

const useNewsStore =create<NewsInterface>((set)=>({
    header:"",
    setHeader:(header:string)=>{
        set({header:header});
    }
}));


