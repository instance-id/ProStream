# Setup

::: info
Upon first importing the ProStream package, the ProStream setup window appears automatically.
:::

![ProStream Setup](/images/import_prostream.png)

## Editor Requirements

:::details Requirements {open}

<!-- Begin Requirements -->
<!--@include: ./requirements.md#requirements-->
<!-- End Requirements -->

:::

## 1) Open the ProStream Setup Window

Upon first importing the ProStream package (or when updating), the ProStream setup window will appear automatically.  

:::tip
For optimal performance, use the settings described above. These settings can be automatically applied in the `Setup Assistant` window.
:::

## 2) Apply Prerequisite Settings

Press the `View Settings Options` button to show the `Setup Assistant` window to apply required and recommended project changes.

![Setup Assistant](/images/ps_recommended_settings.png)

## 3) Import ProStream

If an appropriate SRP (URP/HDRP) is installed, press the `Import ProStream` button to begin installing the necessary dependencies and files.

![Import ProStream](/images/quick_start/requirements_met_setup.png)

::: warning SRP Requirement
An appropriate Scriptable Render Pipeline (URP or HDRP) must be installed before ProStream can be installed.
:::

## Why a setup process?

ProStream is designed to be installed as a proper package in order to ensure proper dependency installation and management and will not show up in your `Assets/` folder.

The purpose of the setup process is to ensure that the package is installed to the correct location and that the necessary dependencies are installed.

::: tip
The setup process can also be accessed by navigating to **Tools > instance.id > ProStream > (Setup/Update) ProStream**
:::
