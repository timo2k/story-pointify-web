import { SubmitHandler, useForm } from 'react-hook-form';

interface UsernameFormProps {
  onSubmitFormValue: Function;
}

type UsernameFormValues = {
  formValue: string;
};

const UsernameForm = ({ onSubmitFormValue }: UsernameFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UsernameFormValues>();
  const onSubmit: SubmitHandler<UsernameFormValues> = (data) =>
    onSubmitFormValue(data);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900">
            Story Pointify
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Der Nutzername ist nur temporär für eine Session gültig
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Anzeigename
                </label>
                <div className="mt-1">
                  <input
                    className="block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                    {...register('formValue', { required: true })}
                    aria-invalid={errors.formValue ? 'true' : 'false'}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-neutral-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                >
                  Los gehts!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsernameForm;
