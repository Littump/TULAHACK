import { Form, Formik } from "formik";
import Search from "@/ui/Search.tsx";
import OrganizationsList from "@/modules/Organizations/ui/OrganizationsList.tsx";
import { useGetOrganizations } from "@/modules/Organizations/api/useGetOrganizations.ts";

const Organizations = () => {
  const initialValues = {
    search: "",
  };
  const { data, isPending } = useGetOrganizations();
  console.log(data);
  if (!data || isPending) return <div className="loading"></div>;
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }) => {
        let organizationsFiltered = data.data
          .filter((el) => el.kind === "company")
          .filter((el) => {
            return (
              el.name.indexOf(values.search) !== -1 ||
              el.username.indexOf(values.search) !== -1 ||
              el.description.indexOf(values.search) !== -1
            );
          });
        return (
          <Form className="flex gap-8 flex-col w-10/12">
            <Search name="search" className="border-violet-600" />
            {isPending || !data ? (
              <div className="loading"></div>
            ) : (
              <OrganizationsList organizations={organizationsFiltered} />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default Organizations;
