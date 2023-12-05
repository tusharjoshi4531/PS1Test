import { Paper, Stack, Tab, Tabs, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import ProjectSupportTabs, {
    ProjectSupportTabsEnum,
} from "../components/navigation/ProjectSupportTabs";
import { Outlet, useNavigate } from "react-router-dom";
import { tabsTheme } from "../theme/theme";
import { useSelector } from "react-redux";
import { UserState } from "../store/user/types";
import { StoreData } from "../store/store";

enum AISupportEnum {
    Roadmap = "roadmap",
    QualityCheck = "quality-check",
    RaiseQuery = "raise-query",
    None = "",
}

const ProjectSupportPage = () => {
    const isAuth = useSelector<StoreData, UserState>((state) => state.user);

    const navigate = useNavigate();

    if (!isAuth.isAuth) {
        navigate("/login");
    }

    const [aiSupportTabsValue, setAiSupportTabsValue] = useState(
        AISupportEnum.Roadmap
    );

    const handleAiSupportTabsChange = (
        _: React.SyntheticEvent,
        newValue: AISupportEnum
    ) => {
        setAiSupportTabsValue(newValue);
        navigate(`/project-support/${newValue}`);
    };

    return (
        <>
            <ProjectSupportTabs value={ProjectSupportTabsEnum.AiSupport} />
            <Paper sx={{ margin: 2, padding: 4, borderRadius: 8, flexGrow: 1 }}>
                <Stack direction="row" height={"100%"}>
                    <ThemeProvider theme={tabsTheme}>
                        <Tabs
                            orientation="vertical"
                            value={aiSupportTabsValue}
                            onChange={handleAiSupportTabsChange}
                            sx={{ minWidth: 150 }}
                        >
                            <Tab
                                value={AISupportEnum.Roadmap}
                                label="Roadmap"
                                sx={{ marginY: 1 }}
                            />
                            <Tab
                                value={AISupportEnum.QualityCheck}
                                label="Quality check"
                                sx={{ marginY: 1 }}
                            />
                            <Tab
                                value={AISupportEnum.RaiseQuery}
                                label="Raise Query"
                                sx={{ marginY: 1 }}
                            />
                        </Tabs>
                    </ThemeProvider>

                    <Outlet />
                </Stack>
            </Paper>
        </>
    );
};

export default ProjectSupportPage;