-- Dummy data untuk Department
INSERT INTO Department (uuid, name, createdAt, updatedAt)
VALUES
    ('teknik-informatika', 'Teknik Informatika', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('sistem-informasi', 'Sistem Informasi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('teknik-sipil', 'Teknik Sipil', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('teknik-mesin', 'Teknik Mesin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('teknik-lingkungan', 'Teknik Lingkungan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('teknik-elektro', 'Teknik Elektro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Dummy data untuk TypeAgenda
INSERT INTO TypeAgenda (uuid, name, createdAt, updatedAt)
VALUES
    (UUID(), 'Rapat Koordinasi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (UUID(), 'Workshop', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (UUID(), 'Seminar', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
