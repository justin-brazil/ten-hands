import { CONFIG_FILES } from "../shared/config";
import {
  getAppUpdate,
  showUpdateAvailableMessage,
  showUpdateNotAvailableMessage,
  showUnableToCheckUpdatesMessage
} from "./updates";
import { MenuItem, dialog } from "electron";
import { log } from "./logger";

const { app, Menu, shell } = require("electron");

const isMac = process.platform === "darwin";

const editMenu: MenuItem = new MenuItem({
  label: "Edit",
  submenu: [
    {
      label: "Configuration",
      click() {
        shell.openItem(CONFIG_FILES.configFile);
      }
    },
    {
      label: "Database",
      click() {
        shell.openItem(CONFIG_FILES.dbFile);
      }
    }
  ]
});

const viewMenu: MenuItem = new MenuItem({
  label: "View",
  submenu: [
    { role: "reload" },
    { role: "forceReload" },
    { role: "toggleDevTools" },
    { type: "separator" },
    { role: "togglefullscreen" }
  ]
});

const helpMenu: MenuItem = new MenuItem({
  label: "Help",
  submenu: [
    {
      label: "Learn More",
      click() {
        shell.openExternalSync("https://github.com/saisandeepvaddi/ten-hands");
      }
    },
    {
      label: "Check for Updates",
      async click() {
        try {
          const update = await getAppUpdate();
          log.info("Update: " + JSON.stringify(update));
          if (update && !update.prerelease) {
            showUpdateAvailableMessage();
          } else {
            showUpdateNotAvailableMessage();
          }
        } catch (error) {
          showUnableToCheckUpdatesMessage();
          log.error("check for updates error: " + error.message);
        }
      }
    },
    {
      label: "About",
      async click() {
        dialog.showMessageBoxSync({
          type: "info",
          title: "Ten Hands",
          message: `Version: ${app.getVersion()}`
        });
      }
    }
  ]
});

const commonMenu: MenuItem[] = [editMenu, viewMenu, helpMenu];

const macMenu: MenuItem[] = [
  new MenuItem({
    label: app.getName(),
    submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }]
  }),
  ...commonMenu
];

const winMenu: MenuItem[] = [
  new MenuItem({
    label: "File",
    submenu: [{ role: "quit" }]
  }),
  ...commonMenu
];

export const menuTemplate: MenuItem[] = isMac ? macMenu : winMenu;

export const getMenu = () => {
  return Menu.buildFromTemplate(menuTemplate);
};

export const createMenu = () => {
  const appMenu = getMenu();
  Menu.setApplicationMenu(appMenu);
};
