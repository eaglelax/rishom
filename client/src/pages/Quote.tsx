import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Building2, 
  Calculator, 
  CheckCircle2, 
  AlertCircle,
  Upload,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Quote() {
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    subsidiary: 'RBF',
    service: '',
    projectType: '',
    budget: '',
    deadline: '',
    location: '',
    description: '',
    files: [] as File[]
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const subsidiaries = [
    { id: 'RBF', name: 'Rishom BTP & Fournitures', services: [
      'Location d\'engins',
      'Vente de matériaux',
      'Construction clé en main',
      'Maintenance équipements'
    ]},
    { id: 'RIC', name: 'Rishom Ingénierie & Conseil', services: [
      'Audit & diagnostic',
      'Conseil stratégique',
      'Étude de marché',
      'Formation conseil'
    ]},
    { id: 'REVI', name: 'REV\'I Agrobusiness', services: [
      'Production agricole',
      'Élevage',
      'Transformation',
      'Distribution'
    ]},
    { id: 'RBA', name: 'Rishom Business Academy', services: [
      'Formation professionnelle',
      'Formation diplômante',
      'Formation sur-mesure entreprise'
    ]}
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({ ...formData, files: [...formData.files, ...newFiles] });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!formData.company) newErrors.push('Nom de l\'entreprise requis');
    if (!formData.contactName) newErrors.push('Nom du contact requis');
    if (!formData.email) newErrors.push('Email requis');
    if (!formData.phone) newErrors.push('Téléphone requis');
    if (!formData.service) newErrors.push('Service requis');
    if (!formData.description) newErrors.push('Description du projet requise');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setErrors([]);
  };

  const selectedSubsidiary = subsidiaries.find(s => s.id === formData.subsidiary);

  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-[#8B1538]/5 to-white flex items-center justify-center px-4 pt-20">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-md shadow-2xl p-8 max-w-md text-center"
          >
            <div className="w-16 h-16 bg-[#058B5E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#058B5E]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Demande envoyée !</h2>
            <p className="text-muted-foreground mb-6">
              Notre équipe examine votre projet et vous contactera sous 24h pour établir un devis personnalisé.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              data-testid="button-new-quote"
              className="bg-[#8B1538] text-white px-6 py-3 rounded-md font-medium transition-all duration-200 hover:shadow-lg"
            >
              Nouvelle demande
            </button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#8B1538]/5 via-white to-[#8B1538]/5 py-16 px-4 pt-32">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#8B1538]/10 text-[#8B1538] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Demande de devis gratuite
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Obtenez votre <span className="text-[#8B1538]">devis personnalisé</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Remplissez ce formulaire et notre équipe vous contactera sous 24h avec une estimation détaillée et adaptée à votre projet.
            </p>
          </motion.div>

          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-md shadow-xl p-8 border border-border"
          >
            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Erreurs détectées :</h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      {errors.map((error, i) => <li key={i}>• {error}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#8B1538]" />
                Informations entreprise
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    data-testid="input-company"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    placeholder="SARL ABC Construction"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nom du contact *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    data-testid="input-contact-name"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    placeholder="Jean Ouédraogo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    data-testid="input-email"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    placeholder="contact@entreprise.bf"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    data-testid="input-phone"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    placeholder="+226 XX XX XX XX"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#8B1538]" />
                Détails du projet
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Filiale concernée *
                    </label>
                    <select
                      name="subsidiary"
                      value={formData.subsidiary}
                      onChange={handleChange}
                      data-testid="select-subsidiary"
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    >
                      {subsidiaries.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service demandé *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      data-testid="select-service"
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    >
                      <option value="">Sélectionnez un service</option>
                      {selectedSubsidiary?.services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type de projet
                    </label>
                    <input
                      type="text"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      data-testid="input-project-type"
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                      placeholder="Ex: Immeuble R+2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Budget estimé (FCFA)
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      data-testid="input-budget"
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                      placeholder="Ex: 50 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Délai souhaité
                    </label>
                    <input
                      type="text"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      data-testid="input-deadline"
                      className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                      placeholder="Ex: 6 mois"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Localisation du projet
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    data-testid="input-location"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    placeholder="Ex: Ouagadougou, Zone industrielle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description détaillée du projet *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    data-testid="textarea-description"
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] bg-background text-foreground"
                    placeholder="Décrivez votre projet en détail : dimensions, spécifications, contraintes, objectifs..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Documents (plans, cahier des charges, photos...)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-md p-6 text-center hover:border-[#8B1538] transition">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      data-testid="input-file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Cliquez pour ajouter des fichiers ou glissez-les ici
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, JPG, PNG (max 10 Mo par fichier)
                      </p>
                    </label>
                  </div>
                  {formData.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-md">
                          <span className="text-sm text-foreground">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            data-testid={`button-remove-file-${index}`}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              data-testid="button-submit-quote"
              className="w-full bg-[#8B1538] text-white py-4 rounded-md font-semibold transition-all duration-200 hover:shadow-xl"
            >
              Envoyer ma demande de devis
            </button>
            <p className="text-sm text-muted-foreground text-center mt-4">
              En envoyant ce formulaire, vous acceptez que nous utilisions vos données pour vous contacter au sujet de votre projet.
            </p>
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
}
