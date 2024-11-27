class FileManager {
    constructor() {
        this.files = []; // Array to store file metadata
    }

    // Create a file
    createFile(fileName, content) {
        return new Promise((resolve, reject) => {
            if (!fileName || !content) {
                return reject("File name or content cannot be empty.");
            }

            const newFile = { name: fileName, content: content };
            this.files.push(newFile);
            resolve(`File ${fileName} created successfully.`);
        });
    }

    // Upload a file
    uploadFile(fileInput) {
        return new Promise((resolve, reject) => {
            const file = fileInput.files[0];
            if (!file) {
                return reject("No file selected for upload.");
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const uploadedFile = {
                    name: file.name,
                    content: event.target.result,
                };
                this.files.push(uploadedFile);
                resolve(`File ${file.name} uploaded successfully.`);
            };
            reader.onerror = () => reject("Error reading file.");
            reader.readAsText(file);
        });
    }

    // Download a file
    downloadFile(fileName) {
        return new Promise((resolve, reject) => {
            const file = this.files.find(f => f.name === fileName);
            if (!file) {
                return reject("File not found.");
            }

            const blob = new Blob([file.content], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();

            resolve(`File ${fileName} is being downloaded.`);
        });
    }

    // Delete a file
    deleteFile(fileName) {
        return new Promise((resolve, reject) => {
            const fileIndex = this.files.findIndex(f => f.name === fileName);
            if (fileIndex === -1) {
                return reject("File not found.");
            }

            this.files.splice(fileIndex, 1);
            resolve(`File ${fileName} deleted successfully.`);
        });
    }

    // Show file names
    showFileNames() {
        return this.files.map(file => file.name);
    }
}

// Initialize file manager
const fileManager = new FileManager();

// Attach event listeners
document.getElementById('createFileBtn').addEventListener('click', () => {
    const fileName = prompt("Enter file name:");
    const content = prompt("Enter file content:");
    fileManager.createFile(fileName, content)
        .then(successMessage => alert(successMessage))
        .catch(error => alert(error));
});

document.getElementById('uploadFileInput').addEventListener('change', (event) => {
    fileManager.uploadFile(event.target)
        .then(successMessage => alert(successMessage))
        .catch(error => alert(error));
});

document.getElementById('downloadFileBtn').addEventListener('click', () => {
    const fileName = prompt("Enter the file name to download:");
    fileManager.downloadFile(fileName)
        .then(successMessage => alert(successMessage))
        .catch(error => alert(error));
});

document.getElementById('deleteFileBtn').addEventListener('click', () => {
    const fileName = prompt("Enter the file name to delete:");
    fileManager.deleteFile(fileName)
        .then(successMessage => alert(successMessage))
        .catch(error => alert(error));
});

// Function to display file names
function displayFileNames() {
    const fileNames = fileManager.showFileNames();
    const fileListElement = document.getElementById('fileList');
    fileListElement.innerHTML = ''; // Clear previous list
    fileNames.forEach(fileName => {
        const li = document.createElement('li');
        li.innerHTML = `${fileName} <button onclick="deleteFile('${fileName}')">Delete</button>`;
        fileListElement.appendChild(li);
    });
}

// Function to handle file deletion
function deleteFile(fileName) {
    fileManager.deleteFile(fileName)
        .then(() => displayFileNames())
        .catch(error => alert(error));
}

// Initial display of file names
setInterval(displayFileNames, 1000);
