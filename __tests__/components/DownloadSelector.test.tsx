import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DownloadSelector from "@/app/components/DownloadSelector";

describe("DownloadSelector", () => {
  test("renders the download button", () => {
    render(<DownloadSelector item={{}} />);
    const downloadButton = screen.getByText("Download");
    expect(downloadButton).toBeInTheDocument();
  });

  test("opens the dropdown when the button is clicked", () => {
    render(<DownloadSelector item={{}} />);
    const downloadButton = screen.getByText("Download");
    fireEvent.click(downloadButton);
    const dropdown = screen.getByText("unknown");
    expect(dropdown).toBeInTheDocument();
  });

  test("shows the right options when the button is clicked", () => {
    render(
      <DownloadSelector
        item={{
          exportLinks: {
            "application/pdf": "https://example.com/pdf",
            "image/jpeg": "https://example.com/jpeg",
          },
        }}
      />
    );
    const downloadButton = screen.getByText("Download");
    fireEvent.click(downloadButton);
    const pdfOption = screen.getByText("pdf");
    expect(pdfOption).toBeInTheDocument();
    const jpegOption = screen.getByText("jpeg");
    expect(jpegOption).toBeInTheDocument();
  });

  test("closes the dropdown when clicking outside", () => {
    render(
      <>
        <div data-testid="outside-element"></div>
        <DownloadSelector item={{}} />
      </>
    );
    const downloadButton = screen.getByText("Download");
    fireEvent.click(downloadButton);
    const outsideElement = screen.getByTestId("outside-element");
    fireEvent.mouseDown(outsideElement);
    const dropdown = screen.queryByText("unknown");
    expect(dropdown).not.toBeInTheDocument();
  });
});
