import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupFormSchema } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"


const SignUpForm = () => {
  const { toast } = useToast();
  const{checkAuthUser, isLoading:isUserLoading}= useUserContext();
  const Navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    console.log(values);
    const newUser = await createUserAccount(values);
    console.log(newUser);

    if (!newUser) {
      return toast({ title: "Signup failed please try again", variant: "destructive" });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({ title: "Login failed please try again", variant: "destructive" });
    }

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn){
      form.reset();
      Navigate('/')
    }else{
      toast({title:'Signed up failed. Please try again later'})
    }
  }



  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col flex-center">
        <img src="/assets/images/logo.svg" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use socialgram please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="name" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="username" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex items-center gap-2">
                <Loader />...Loading
              </div>
            ) : (
              "Sign Up"
            )}</Button>
          <p className="text-light-2 text-small-regular flex-center">Already have an account?
            <Link to="signin" className="text-primary-500 text-small-semibold ml-1">Login</Link></p>
        </form>
      </div>
    </Form >
  )
}

export default SignUpForm