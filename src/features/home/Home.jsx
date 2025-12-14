import { useGetProductsQuery } from "@/features/products/productApi"
import ProductCard from "../products/ProductCard";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import { Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSearchParams } from "react-router";
import { useEffect } from "react";




export default function Home() {
  const [params,setParams]=useSearchParams();
  const querYpage = params.get('page') ?? 1;
  const query = params.get('search') ?  {
    search:params.get('search')
  } : null;
  const {isLoading,error,data} =useGetProductsQuery({...query,page:querYpage 
 });
   useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [querYpage]);


  if(isLoading) return  <div className="grid grid-cols-4 gap-6 mt-4 items-start">
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
  </div>
  if(error) return <h1 className="text-pink-950">Error loading products</h1>
  if(!data || !data.products) return <h1 className="text-pink-950">No products found</h1>
  console.log(data);
  return (
    <div>

      <h1>Welcome To Shop Online.</h1>




          <Formik
          initialValues={{
            search: ''
          }}
          onSubmit={(val,{resetForm})=>{
            console.log(val);
            setParams({search:val.search});
            resetForm();
          }}
          >
            {({handleChange,handleSubmit,values,touched,errors})=>(
            <form 
            onSubmit={handleSubmit}
            className='mt-4 mb-4 max-w-sm'>
              <div className="flex gap-5">
                <Input
                onChange={handleChange}
                
                value={values.search}
                name= 'search' placeholder = 'search'/>
                <Button>Search</Button>
              </div>
            </form>
          )}
              </Formik>

<div className="grid grid-cols-4 gap-6 mt-4 items-start">
        {data.products.map((product) => {
        return  <ProductCard key={product._id} product={product} />
      })}
      </div>
     
        <div className="flex gap-5 my-5 justify-center">
          <Button disabled ={Number(querYpage)===1} onClick={() => setParams({page:Number(params.get("page"))-1})}>Prev</Button>
          <h1>{params.get('page') ?? 1}</h1>
           <Button onClick={() => setParams({page:Number(querYpage)+1})}
            disabled={data.totalPages === Number (querYpage)}>Next</Button>
        </div>

      
    </div>
  )
}
