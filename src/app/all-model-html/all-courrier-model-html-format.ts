export const demande_de_financement = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Courrier</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }

        .letter-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            
            max-width: 800px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 20px;
        }

        header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }

        header p {
            margin: 0;
            color: #666;
        }

        .recipient-address {
            margin-bottom: 20px;
        }

        .date {
            text-align: right;
            margin-bottom: 20px;
            color: #666;
        }

        .letter-body {
            margin-bottom: 40px;
        }

        .signature {
            text-align: right;
        }

        .signature p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="letter-container">
        <header>
            <h1>Mon Entreprise</h1>
            <p>123 Rue de l'Exemple<br>75001 Paris<br>France</p>
        </header>
        <div class="recipient-address">
            <p>Nom du Destinataire<br>456 Rue de Destination<br>75002 Paris<br>France</p>
        </div>
        <div class="date">
            <p>Paris, le 4 juin 2024</p>
        </div>
        <div class="letter-body">
            <p>Bonjour [Nom du Destinataire],</p>
            <p>Je vous écris pour vous informer de ...</p>
            <p>En vous remerciant de votre attention, je vous prie d'agréer, [Nom du Destinataire], l'expression de mes salutations distinguées.</p>
        </div>
        <div class="signature">
            <p>Signature</p>
            <p>[Votre Nom]</p>
        </div>
    </div>
</body>
</html>
`;

export const demande_document = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Courrier</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            
        }

        .letter-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            
            max-width: 800px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 20px;
        }

        header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }

        header p {
            margin: 0;
            color: #666;
        }

        .recipient-address {
            margin-bottom: 20px;
        }

        .date {
            text-align: right;
            margin-bottom: 20px;
            color: #666;
        }

        .letter-body {
            margin-bottom: 40px;
        }

        .signature {
            text-align: right;
        }

        .signature p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="letter-container">
        <header>
            <h1>Nouvelle Entreprise</h1>
            <p>789 Rue de Exemple<br>75003 Paris<br>France</p>
        </header>
        <div class="recipient-address">
            <p>Nouveau Destinataire<br>101 Rue de Destination<br>75004 Paris<br>France</p>
        </div>
        <div class="date">
            <p>Paris, le 5 juin 2024</p>
        </div>
        <div class="letter-body">
            <p>Bonjour [Nouveau Destinataire],</p>
            <p>Je vous écris pour vous informer de ...</p>
            <p>En vous remerciant de votre attention, je vous prie d'agréer, [Nouveau Destinataire], l'expression de mes salutations distinguées.</p>
        </div>
        <div class="signature">
            <p>Signature</p>
            <p>[Votre Nouveau Nom]</p>
        </div>
    </div>
</body>
</html>
`;

