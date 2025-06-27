var gk_isXlsx = false;
        var gk_xlsxFileLookup = {};
        var gk_fileData = {};
        function filledCell(cell) {
          return cell !== '' && cell != null;
        }
        function loadFileData(filename) {
        if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
            try {
                var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                var firstSheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[firstSheetName];

                // Convert sheet to JSON to filter blank rows
                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                // Filter out blank rows (rows where all cells are empty, null, or undefined)
                var filteredData = jsonData.filter(row => row.some(filledCell));

                // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
                var headerRowIndex = filteredData.findIndex((row, index) =>
                  row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                );
                // Fallback
                if (headerRowIndex === -1 || headerRowIndex > 25) {
                  headerRowIndex = 0;
                }

                // Convert filtered JSON back to CSV
                var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
                csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                return csv;
            } catch (e) {
                console.error(e);
                return "";
            }
        }
        return gk_fileData[filename] || "";
        }
        


        AOS.init();

        // Pin verification
        const correctPin = "7763096308";
        document.getElementById('unlock-btn').addEventListener('click', () => {
            const pin = document.getElementById('pin-input').value;
            if (pin === correctPin) {
                document.getElementById('lock-screen').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
                gsap.from('#main-content', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out' });
            } else {
                document.getElementById('error-message').classList.remove('hidden');
            }
        });

        // Heart animation
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's';
            document.getElementById('hearts').appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }
        setInterval(createHeart, 200);

        // Confetti animation
        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = ['#ff9ff3', '#feca57', '#54a0ff'][Math.floor(Math.random() * 3)];
            confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
            document.getElementById('confetti').appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
        setInterval(createConfetti, 150);

        // Sparkle animation
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            document.getElementById('sparkles').appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 3000);
        }
        setInterval(createSparkle, 300);

        // Proposal button
        document.getElementById('propose-btn').addEventListener('click', () => {
            const message = document.getElementById('proposal-message');
            message.style.display = 'block';
            gsap.from('#proposal-message', { scale: 0.8, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
            AOS.refresh();
        });