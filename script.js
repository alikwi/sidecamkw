const client = new Appwrite.Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6aa9c83f001baf62e817');

const tablesDB = new Appwrite.TablesDB(client);

const DATABASE_ID = '6aa9c8c0001edf97de19';
const MATCHES_TABLE_ID = '6aa9c8df0036872a58d8';

async function loadMatches() {
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: MATCHES_TABLE_ID
    });

    console.log('✅ Appwrite connected');
    console.log(result.rows);

    const matchGrid = document.querySelector('#matchGrid');

    if (!matchGrid) {
      console.error('matchGrid not found');
      return;
    }

    if (result.rows.length === 0) {
      matchGrid.innerHTML = '<p>No matches available.</p>';
      return;
    }

    matchGrid.innerHTML = result.rows.map(match => `
      <article class="match-card" data-id="${match.$id}">
        <div class="match-image">
          <span class="date">
            ${match.match_date ? new Date(match.match_date).toLocaleDateString('en-GB') : ''}
          </span>
        </div>

        <div class="match-body">
          <h3>
            ${match.home_team}
            <span style="color:#59625f"> / </span>
            ${match.away_team}
          </h3>

          <p>${match.competition || ''}</p>
        </div>
      </article>
    `).join('');

  } catch (error) {
    console.error('❌ Appwrite error:', error);

    const matchGrid = document.querySelector('#matchGrid');

    if (matchGrid) {
      matchGrid.innerHTML = '<p>Unable to load matches.</p>';
    }
  }
}

loadMatches();
