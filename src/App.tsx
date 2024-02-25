import { useEffect, useState } from "react";
import { Button, DataTable } from "@carbon/react";
import { Session, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { HeaderKeys, OrderData } from "./model";

const { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } =
  DataTable;
const supabase = createClient(
  import.meta.env.VITE_SUPA_PROJECT_URL as string,
  import.meta.env.VITE_SUPA_ANON_KEY as string
);

const headers = [
  {
    key: HeaderKeys.OrderID,
    label: "Order ID",
  },
  {
    key: HeaderKeys.PartnerName,
    label: "Partner Name",
  },
  {
    key: HeaderKeys.OrganizationName,
    label: "Organization Name",
  },
  {
    key: HeaderKeys.OrganizationLocation,
    label: "Org. Location",
  },
  {
    key: HeaderKeys.PartnerContactNumber,
    label: "Partner's Contact",
  },
];

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (session) {
        const { data, error } = await supabase.rpc("get_orders").select("*");
        if (error) alert("Error fetching orders");
        else setOrderData(data);
      }
    })();
  }, [session]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error Signing out");
    } else {
      setSession(null);
    }
  };
  if (!session)
    return (
      <div className="login-root">
        <div className="login-container">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
          />
        </div>
      </div>
    );
  return (
    <>
      <div className="btn-container">
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      <div>
        <Table size="lg" useZebraStyles={false}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key}>{header.label}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((row: OrderData) => (
              <TableRow key={row.orderid}>
                {headers.map((header) => {
                  return (
                    <TableCell key={header.key}>
                      {header.key === HeaderKeys.PartnerName
                        ? `${row.partnerfirstname} ${row.partnerlastname}`
                        : row[header.key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default App;
