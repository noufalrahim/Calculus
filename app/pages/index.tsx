import HeaderBar from "@/components/HeaderBar";
import MainSideBar from "@/components/SideNavBar/MainSideBar";
import RightSideNavBar from "@/components/SideNavBar/RightSideNavBar";
import SubSideBar from "@/components/SideNavBar/SubSideBar";
import Billing from "@/screens/Billing";
import Enterprise from "@/screens/Enterprises";
import Help from "@/screens/Help";
import Home from "@/screens/Home";
import Market from "@/screens/Market";
import PaymentOversight from "@/screens/PaymentOversight";
import PeriodicReports from "@/screens/PeriodicReports";
import Return from "@/screens/Return";
import Settings from "@/screens/Settings";
import React from "react";
declare global {
  interface Window {
    electron: {
      addItem: () => void;
      getItemData: (callback: (data: any) => void) => void;
      openBillingWindow: (data: any) => void;
      openMarketWindow: () => void;
      openPurchasesWindow: (data:any) => void;
      openSalesWindow: () => void;
      openStockWindow: () => void;
      getEditMarketData: (callback: (data: any) => void) => void;
      openEditStockWindow: (data: any) => void;
      openEditMarketWindow: (data: any) => void;
      getEditStockData: (callback: (data: any) => void) => void;
      openAuthWindow: () => void;
      openBarcodeWindow: (data: any) => void;
      getBarcodeData: (callback: (data: any) => void) => void;
      openAddPaymentOversightWindow: () => void;
      openAddPaymentTrackerWindow: (data: any) => void;
      getPaymentTrackerData: (callback: (data: any) => void) => void;
    };
    api: {
      query: (sql: string, params?: any[]) => void;
      onQueryReply: (callback: (result: any) => void) => void;
      onQueryError: (callback: (error: any) => void) => void;
    };
    app: {
      print: (data: any) => void;
    },
    auth: {
      login: (data: any) => void;
      logout: () => void;
      getAuthType: (callback: (data: any) => void) => void;
    },
    reloader: {
      getMainReload: (callback: (data: any) => void) => void;
      mainReload: () => void;
    }
  }
}

export default function Index() {
  const [folderId, setFolderId] = React.useState("HOME");
  const [subFolderId, setSubFolderId] = React.useState("");
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [pdfId] = React.useState("pdf-content");
  const [ipcOpener, setIpcOpener] = React.useState("open-billing");
  const [payOpsId,  setPayOpsId] = React.useState(0);

  const [renderComponent, setRenderComponent] = React.useState({
    page: "ENTERPRISES_PURCHASES",
    index: 0,
  });

  const [columnFilters, setColumnFilters] = React.useState([
    {
      id: "ENTERPRISE",
      value: "",
    },
    {
      id: "VENDOR",
      value: "",
    }
  ]);

  const [accType, setAccType] = React.useState("CHILD");

  const [filterSearchParam, setFilterSearchParam] = React.useState('ENTERPRISE');
  const [dateFilter, setDateFilter] = React.useState();
  const [showAddButton, setShowAddButton] = React.useState(true);
  const [active, setActive] = React.useState('HOME');


  React.useEffect(() => {

    if (typeof window !== 'undefined' && window.api) {
      window.api.query('CREATE TABLE IF NOT EXISTS some_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);');
      window.api.query('DROP TABLE IF EXISTS some_table');
      // Uncomment and modify these queries as needed
      // window.api.query('INSERT INTO users (name) VALUES (?)', ['John Doe']);
      // window.api.query('SELECT * FROM users');

      // window.api.onQueryReply((result) => {
      //   console.log('Query Result:', result);
      // });

      // window.api.onQueryError((error) => {
      //   console.error('Query Error:', error);
      // });
    }
  }, []);


  React.useEffect(() => {
    window.auth.getAuthType((data) => {
      setAccType(data.accountType);
    });
  }, []);

  const noSideBarFolders = ["HOME", "HELP", "BILLING", "MARKET", "ITEMS", "PERIODIC", "RETURN", "PAYOPS"];

  React.useEffect(() => {
    if (!noSideBarFolders.includes(folderId)) {
      setShowSideBar(true);
    } else {
      setShowSideBar(false);
    }
  }, [folderId]);

  const RENDER_TABLE = () => {
    switch (folderId) {
      case "HOME":
        return (
          <Home
            setShowAddButton={(value: boolean) => setShowAddButton(value)}
            setFolderId={setFolderId}
            setActive={(value: string) => setActive(value)}
            accType={accType}
          />
        );
      case "ENTERPRISES":
        return (
          <Enterprise
            subFolderId={subFolderId}
            columnFilters={columnFilters}
            renderComponent={renderComponent}
            setRenderComponent={setRenderComponent}
            dateFilter={dateFilter}
            setIpcOpener={setIpcOpener}
            setShowAddButton={(value: boolean) => setShowAddButton(value)}
            accType={accType}
            setFilterSearchParam={(value: string) => setFilterSearchParam(value)}
          />
        );
      case "PERIODIC":
        return (
          <PeriodicReports
            subFolderId={subFolderId}
            columnFilters={columnFilters}
            renderComponent={renderComponent}
            setRenderComponent={setRenderComponent}
            dateFilter={dateFilter}
            setShowAddButton={(value: boolean) => setShowAddButton(value)}
            accType={accType}
            setFilterSearchParam={(value: string) => setFilterSearchParam(value)}
          />
        );
      case "BILLING":
        return (
          <Billing
            setIpcOpener={setIpcOpener}
            setShowAddButton={(value: boolean) => setShowAddButton(value)}
            accType={accType}
            columnFilters={columnFilters}
            dateFilter={dateFilter}
            setFilterSearchParam={(value: string) => setFilterSearchParam(value)}
          />
        );
      case "MARKET":
        return (
          <Market
            columnFilters={columnFilters}
            setIpcOpener={setIpcOpener}
            setShowAddButton={(value: boolean) => setShowAddButton(value)}
            accType={accType}
            setFilterSearchParam={(value: string) => setFilterSearchParam(value)}
          />
        );
      case "RETURN":
        return (
          <Return />
        );
      case "PAYOPS":
        return (
          <PaymentOversight 
            columnFilters={columnFilters}
            setIpcOpener={setIpcOpener}
            setShowAddButton={(value: boolean) => setShowAddButton(value)}
            accType={accType}
            payOpsId={payOpsId}
            setPayOpsId={(id: any) => setPayOpsId(id)}
            dateFilter={dateFilter}
            setFilterSearchParam={(value: string) => setFilterSearchParam(value)}
          />
        );
      case "SETTINGS":
        return (
          <Settings
            subFolderId={subFolderId}
            setShowAddButton={(value: boolean) => setShowAddButton(value)}
            setIpcOpener={setIpcOpener}
            accType={accType}
          />
        );
      case "HELP":
        return (
          <Help />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className="window">
        <HeaderBar
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          filterSearchParam={filterSearchParam}
          pdfId={pdfId}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          ipcOpener={ipcOpener}
          showAddButton={showAddButton}
          accType={accType}
          setPayOpsId={(id: any) => setPayOpsId(id)}
          payOpsId={payOpsId}
        />
        <div className="window-content">
          <div className="pane-group">
            <MainSideBar
              folderId={folderId}
              setFolderId={setFolderId}
              setRenderComponent={setRenderComponent}
              active={active}
              setActive={(value: string) => setActive(value)}
              accType={accType}
            />
            {showSideBar && (
              <SubSideBar
                folderId={folderId}
                setShowSideBar={setShowSideBar}
                setRenderComponent={setRenderComponent}
                setSubFolderId={setSubFolderId}
              />
            )}
            <div className="pane">
              {RENDER_TABLE()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
