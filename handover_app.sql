-- Create database
CREATE DATABASE handover_app;

-- Connect to the database
\c handover_app;

-- Create table for locations
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,               -- Unique identifier for each location
    name TEXT NOT NULL,                  -- Name of the location (e.g., "Berlin Apartment")
    address TEXT,                        -- Address of the location
    created_at TIMESTAMP DEFAULT NOW()   -- Timestamp for when the location was created
);

-- Create table for checklists
CREATE TABLE checklists (
    id SERIAL PRIMARY KEY,               -- Unique identifier for each checklist
    location_id INT NOT NULL,            -- Foreign key referencing the location
    task TEXT NOT NULL,                  -- Name of the task
    description TEXT NOT NULL,           -- Detailed description of the task
    qr_code TEXT UNIQUE NOT NULL,        -- QR code identifier for task validation
    status TEXT DEFAULT 'incomplete',    -- Task status (e.g., incomplete, complete)
    created_at TIMESTAMP DEFAULT NOW(),  -- Timestamp for when the checklist was created
    FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE -- Cascades on location deletion
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  vorname VARCHAR(50),
  nachname VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);



-- Insert test data for locations
INSERT INTO locations (name, address) VALUES
('Berlin Apartment', '123 Berlin St, Berlin, Germany'),
('Munich Villa', '456 Munich Rd, Munich, Germany');

-- Insert test data for checklists
INSERT INTO checklists (location_id, task, description, qr_code, status) VALUES
(1, 'Take out the trash', 'Ensure all trash bins are emptied and bags are placed in the designated outdoor garbage area.', 'qr_trash_bin_berlin', 'incomplete'),
(1, 'Return the keys', 'Place the keys in the lockbox located at the main entrance.', 'qr_lockbox_berlin', 'incomplete'),
(2, 'Check windows and doors', 'Ensure all windows and doors are securely closed and locked.', 'qr_windows_doors_munich', 'incomplete'),
(2, 'Adjust thermostat', 'Set the thermostat to 22°C as instructed by the host.', 'qr_thermostat_munich', 'incomplete');

