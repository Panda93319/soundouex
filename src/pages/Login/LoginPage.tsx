import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import ReCAPTCHA from "react-google-recaptcha";

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AuthFormField } from '@/components/auth/FormField';
import { login } from '@/services/authService';
import { LOGIN_FIELDS } from '@/lib/authContants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!captchaVerified) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    setIsLoading(true);
    try {
      await login(values);
      toast.success("Successfully logged in!");
      navigate('/pass');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to log in. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto bg-black/30 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-500/20 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient-primary">Login</h1>
            <p className="text-gray-300 mt-2">Welcome back to SOUNDUOEX</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {LOGIN_FIELDS.map((field) => (
                <AuthFormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  icon={field.icon}
                />
              ))}

              <div className="flex justify-center my-6">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onCaptchaChange}
                  theme="dark"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 py-6"
                disabled={isLoading || !captchaVerified}
              >
                {isLoading ? "Logging In..." : "Login"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-pink-400 hover:text-pink-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default LoginPage;