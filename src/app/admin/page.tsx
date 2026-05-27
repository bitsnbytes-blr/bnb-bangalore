"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TextDecoder } from "@/components/TextDecoder";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { 
  LogOut, 
  Search, 
  Trash2, 
  Edit, 
  Plus, 
  Download, 
  ExternalLink, 
  X, 
  Save,
  CheckCircle,
  AlertTriangle,
  GitBranch,
  Laptop,
  MessageSquare,
  Award
} from "lucide-react";

interface Registration {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  class: string;
  stream: string;
  github?: string;
  experience?: string;
  interest?: string;
  laptop?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals & Forms State
  const [editingItem, setEditingItem] = useState<Registration | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Selected motivation overlay state
  const [selectedInterest, setSelectedInterest] = useState<{ name: string; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    studentClass: "",
    stream: "",
    github: "",
    experience: "",
    interest: "",
    laptop: "",
  });

  const showStatus = useCallback((type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  }, []);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (err: unknown) {
      console.error("Error fetching registrations:", err);
      const errorObj = err as { message?: string };
      showStatus("error", errorObj.message || "Failed to load registrations.");
    } finally {
      setLoading(false);
    }
  }, [showStatus]);

  // Verify Authentication & Fetch Data
  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setSessionUser(session.user);
      fetchRegistrations();
    };

    initSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setSessionUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, fetchRegistrations]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("registrations")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            school: formData.school,
            class: formData.studentClass,
            stream: formData.stream,
            github: formData.github,
            experience: formData.experience,
            interest: formData.interest,
            laptop: formData.laptop,
          }
        ]);

      if (error) throw error;

      showStatus("success", "Registration added successfully!");
      setIsAdding(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        school: "",
        studentClass: "",
        stream: "",
        github: "",
        experience: "",
        interest: "",
        laptop: "",
      });
      fetchRegistrations();
    } catch (err: unknown) {
      console.error("Error adding registration:", err);
      const errorObj = err as { message?: string };
      showStatus("error", errorObj.message || "Failed to add registration.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const { error } = await supabase
        .from("registrations")
        .update({
          name: editingItem.name,
          email: editingItem.email,
          phone: editingItem.phone,
          school: editingItem.school,
          class: editingItem.class,
          stream: editingItem.stream,
          github: editingItem.github || "",
          experience: editingItem.experience || "",
          interest: editingItem.interest || "",
          laptop: editingItem.laptop || "",
        })
        .eq("id", editingItem.id);

      if (error) throw error;

      showStatus("success", "Registration updated successfully!");
      setEditingItem(null);
      fetchRegistrations();
    } catch (err: unknown) {
      console.error("Error updating registration:", err);
      const errorObj = err as { message?: string };
      showStatus("error", errorObj.message || "Failed to update registration.");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const { error } = await supabase
        .from("registrations")
        .delete()
        .eq("id", deletingId);

      if (error) throw error;

      showStatus("success", "Registration deleted successfully.");
      setDeletingId(null);
      fetchRegistrations();
    } catch (err: unknown) {
      console.error("Error deleting registration:", err);
      const errorObj = err as { message?: string };
      showStatus("error", errorObj.message || "Failed to delete registration.");
    }
  };

  // Export to CSV Function
  const exportToCSV = () => {
    if (registrations.length === 0) return;
    
    const headers = ["Name", "Email", "Phone", "School", "Class", "Stream", "GitHub", "Experience", "Laptop Requirement", "Idea/Goals", "Registration Date"];
    const rows = registrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.school,
      reg.class,
      reg.stream || "",
      reg.github || "",
      reg.experience || "",
      reg.laptop || "",
      reg.interest || "",
      new Date(reg.created_at).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bnb_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Search filter logic
  const filteredRegistrations = registrations.filter(reg => {
    const query = searchQuery.toLowerCase();
    return (
      reg.name.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query) ||
      reg.phone.toLowerCase().includes(query) ||
      reg.school.toLowerCase().includes(query) ||
      reg.class.toLowerCase().includes(query) ||
      reg.stream.toLowerCase().includes(query) ||
      (reg.github && reg.github.toLowerCase().includes(query)) ||
      (reg.experience && reg.experience.toLowerCase().includes(query)) ||
      (reg.laptop && reg.laptop.toLowerCase().includes(query)) ||
      (reg.interest && reg.interest.toLowerCase().includes(query))
    );
  });

  // Analytics Math
  const totalCount = registrations.length;
  const count11th = registrations.filter(r => r.class.includes("11th")).length;
  const count12th = registrations.filter(r => r.class.includes("12th")).length;
  const needLaptopCount = registrations.filter(r => r.laptop && r.laptop.includes("Yes")).length;

  if (!sessionUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-ash">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-blood border-t-transparent animate-spin rounded-full mx-auto" />
          <p>Verifying secure credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden bg-black text-white">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blood/5 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blood/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <h1 className="font-heading font-black text-4xl uppercase mb-2">
                <TextDecoder text="Control Room" />
              </h1>
              <p className="font-mono text-ash text-xs tracking-widest uppercase">
                Active Session: {sessionUser.email}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={exportToCSV}
                className="bg-white/5 border border-white/10 text-white font-mono text-xs px-4 py-3 uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <Download size={14} /> Export CSV
              </button>
              
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-blood text-white font-mono text-xs px-4 py-3 uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <Plus size={14} /> Add Student
              </button>

              <button 
                onClick={handleLogout}
                className="border border-blood/20 bg-blood/10 text-blood font-mono text-xs px-4 py-3 uppercase tracking-wider hover:bg-blood hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut size={14} /> Disconnect
              </button>
            </div>
          </div>

          {/* STATUS TOAST */}
          {statusMessage && (
            <div className={`fixed bottom-8 right-8 z-50 border p-4 font-mono text-xs flex items-center gap-3 shadow-2xl animate-slide-up ${
              statusMessage.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-blood/10 border-blood/20 text-blood"
            }`}>
              {statusMessage.type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
              {statusMessage.text}
            </div>
          )}

          {/* ANALYTICS DASHBOARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#050505] border border-white/10 p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blood" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-ash mb-2">Total Registrations</p>
              <h3 className="font-heading font-black text-4xl text-white">{totalCount}</h3>
            </div>
            
            <div className="bg-[#050505] border border-white/10 p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blood" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-ash mb-2">11th Grade (1st PU)</p>
              <h3 className="font-heading font-black text-4xl text-white">{count11th}</h3>
            </div>

            <div className="bg-[#050505] border border-white/10 p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blood" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-ash mb-2">12th Grade (2nd PU)</p>
              <h3 className="font-heading font-black text-4xl text-white">{count12th}</h3>
            </div>

            <div className="bg-[#050505] border border-white/10 p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blood" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-ash mb-2">Need Laptop Provided</p>
              <h3 className="font-heading font-black text-4xl text-white">{needLaptopCount}</h3>
            </div>
          </div>

          {/* SEARCH & CONTROLS */}
          <div className="bg-[#050505] border border-white/10 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" size={16} />
              <input 
                type="text"
                placeholder="SEARCH BY NAME, SCHOOL, STREAM, CLASS, GITHUB, MOTIVATION..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/5 pl-12 pr-4 py-3 text-white font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-blood focus:bg-white/10 transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          {/* MAIN DATATABLE */}
          <div className="bg-[#050505] border border-white/10 overflow-hidden relative">
            {loading ? (
              <div className="p-24 text-center font-mono text-ash space-y-4">
                <div className="w-8 h-8 border-2 border-blood border-t-transparent animate-spin rounded-full mx-auto" />
                <p>Retrieving database records...</p>
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="p-24 text-center font-mono text-ash">
                No matching registration logs found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 uppercase text-ash tracking-wider">
                      <th className="py-4 px-6 font-bold">Student Name</th>
                      <th className="py-4 px-6 font-bold">Email</th>
                      <th className="py-4 px-6 font-bold">Phone</th>
                      <th className="py-4 px-6 font-bold">School / College</th>
                      <th className="py-4 px-6 font-bold">Class</th>
                      <th className="py-4 px-6 font-bold">Stream</th>
                      <th className="py-4 px-6 font-bold text-center">GitHub</th>
                      <th className="py-4 px-6 font-bold text-center">Laptop</th>
                      <th className="py-4 px-6 font-bold text-center">Idea</th>
                      <th className="py-4 px-6 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-4 px-6 text-white font-bold">{reg.name}</td>
                        <td className="py-4 px-6 text-ash">{reg.email}</td>
                        <td className="py-4 px-6 text-ash">{reg.phone}</td>
                        <td className="py-4 px-6 text-ash">{reg.school}</td>
                        <td className="py-4 px-6">
                          <span className="bg-white/5 px-2.5 py-1 text-[10px] text-white/80 border border-white/10 uppercase rounded-full">
                            {reg.class}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-blood/10 px-2.5 py-1 text-[10px] text-blood border border-blood/20 uppercase rounded-full">
                            {reg.stream || "N/A"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {reg.github ? (
                            <a 
                              href={reg.github.startsWith("http") ? reg.github : `https://${reg.github}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-ash hover:text-white transition-colors inline-block"
                              title={reg.github}
                            >
                              <GitBranch size={16} />
                            </a>
                          ) : (
                            <span className="text-white/10">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {reg.laptop && reg.laptop.includes("Yes") ? (
                            <span className="text-blood" title="Needs laptop provided">
                              <Laptop size={16} className="inline" />
                            </span>
                          ) : (
                            <span className="text-white/20">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {reg.interest ? (
                            <button
                              onClick={() => setSelectedInterest({ name: reg.name, text: reg.interest || "" })}
                              className="text-ash hover:text-emerald-400 transition-colors p-1"
                              title="Read Student Idea"
                            >
                              <MessageSquare size={16} />
                            </button>
                          ) : (
                            <span className="text-white/10">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex justify-center items-center gap-3">
                            <a 
                              href={`/certificate?name=${encodeURIComponent(reg.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-ash hover:text-white transition-colors p-1"
                              title="Preview Certificate"
                            >
                              <ExternalLink size={14} />
                            </a>
                            <button 
                              onClick={() => setEditingItem(reg)}
                              className="text-ash hover:text-emerald-400 transition-colors p-1"
                              title="Edit Registry"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => setDeletingId(reg.id)}
                              className="text-ash hover:text-blood transition-colors p-1"
                              title="Delete Registry"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* IDEA POPUP MODAL */}
      {selectedInterest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#080808] border border-white/10 max-w-lg w-full p-8 md:p-10 relative shadow-2xl">
            <button 
              onClick={() => setSelectedInterest(null)}
              className="absolute top-6 right-6 text-ash hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blood/10 border border-blood/20 rounded-full flex items-center justify-center text-blood">
                <Award size={16} />
              </div>
              <h3 className="font-heading font-black text-xl uppercase text-white">{selectedInterest.name}&apos;s Idea</h3>
            </div>
            
            <p className="font-mono text-ash text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto border border-white/5 bg-white/[0.02] p-6">
              {selectedInterest.text}
            </p>
            
            <button 
              onClick={() => setSelectedInterest(null)}
              className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs px-6 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition-colors mt-6"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#080808] border border-white/10 max-w-lg w-full p-8 md:p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-6 right-6 text-ash hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            
            <h3 className="font-heading font-black text-2xl uppercase mb-6 text-white">Add Builder Entry</h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">School / College</label>
                <input 
                  type="text" 
                  required
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                  placeholder="e.g. Great Eastern PU College"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Class</label>
                  <select
                    required
                    value={formData.studentClass}
                    onChange={(e) => setFormData({...formData, studentClass: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood appearance-none"
                  >
                    <option value="" disabled className="bg-black text-ash">Select Class</option>
                    <option value="11th (1st PU)" className="bg-black text-white">11th Grade (1st PU)</option>
                    <option value="12th (2nd PU)" className="bg-black text-white">12th Grade (2nd PU)</option>
                    <option value="Other" className="bg-black text-white">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Stream</label>
                  <input 
                    type="text" 
                    required
                    value={formData.stream}
                    onChange={(e) => setFormData({...formData, stream: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                    placeholder="e.g. PCMC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">GitHub Link</label>
                  <input 
                    type="text" 
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                    placeholder="e.g. github.com/user"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Laptop Req</label>
                  <select
                    required
                    value={formData.laptop}
                    onChange={(e) => setFormData({...formData, laptop: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood appearance-none"
                  >
                    <option value="" disabled className="bg-black text-ash">Laptop Needed?</option>
                    <option value="No, I will bring my own laptop" className="bg-black text-white">No</option>
                    <option value="Yes, I need a laptop provided" className="bg-black text-white">Yes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Experience Level</label>
                <select
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood appearance-none"
                >
                  <option value="" disabled className="bg-black text-ash">Select Level</option>
                  <option value="Beginner (Never coded before)" className="bg-black text-white">Beginner</option>
                  <option value="Intermediate (Know basic Python/JS/HTML)" className="bg-black text-white">Intermediate</option>
                  <option value="Advanced (Built and shipped working web apps)" className="bg-black text-white">Advanced</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Idea / Why Join</label>
                <textarea 
                  required
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood resize-none"
                  placeholder="Student motivation or goals..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blood text-white font-mono text-xs px-6 py-3.5 uppercase tracking-widest hover:bg-white hover:text-black transition-colors mt-6"
              >
                Insert Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#080808] border border-white/10 max-w-lg w-full p-8 md:p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setEditingItem(null)}
              className="absolute top-6 right-6 text-ash hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            
            <h3 className="font-heading font-black text-2xl uppercase mb-6 text-white">Edit Registry Logs</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={editingItem.email}
                  onChange={(e) => setEditingItem({...editingItem, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={editingItem.phone}
                  onChange={(e) => setEditingItem({...editingItem, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">School / College</label>
                <input 
                  type="text" 
                  required
                  value={editingItem.school}
                  onChange={(e) => setEditingItem({...editingItem, school: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Class</label>
                  <select
                    required
                    value={editingItem.class}
                    onChange={(e) => setEditingItem({...editingItem, class: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood appearance-none"
                  >
                    <option value="11th (1st PU)">11th Grade (1st PU)</option>
                    <option value="12th (2nd PU)">12th Grade (2nd PU)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Stream</label>
                  <input 
                    type="text" 
                    required
                    value={editingItem.stream}
                    onChange={(e) => setEditingItem({...editingItem, stream: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">GitHub username/link</label>
                  <input 
                    type="text" 
                    value={editingItem.github || ""}
                    onChange={(e) => setEditingItem({...editingItem, github: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Laptop Requirement</label>
                  <select
                    required
                    value={editingItem.laptop || ""}
                    onChange={(e) => setEditingItem({...editingItem, laptop: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood appearance-none"
                  >
                    <option value="No, I will bring my own laptop">No</option>
                    <option value="Yes, I need a laptop provided">Yes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Experience Level</label>
                <select
                  required
                  value={editingItem.experience || ""}
                  onChange={(e) => setEditingItem({...editingItem, experience: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood appearance-none"
                >
                  <option value="Beginner (Never coded before)">Beginner</option>
                  <option value="Intermediate (Know basic Python/JS/HTML)">Intermediate</option>
                  <option value="Advanced (Built and shipped working web apps)">Advanced</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ash">Idea / Why Join</label>
                <textarea 
                  required
                  value={editingItem.interest || ""}
                  onChange={(e) => setEditingItem({...editingItem, interest: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blood resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-500 text-black font-mono text-xs px-6 py-3.5 uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 mt-6 font-bold"
              >
                <Save size={14} /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#080808] border border-blood/20 max-w-sm w-full p-8 text-center relative shadow-2xl">
            <div className="w-12 h-12 bg-blood/10 text-blood rounded-full flex items-center justify-center mx-auto mb-4 border border-blood/20">
              <Trash2 size={24} />
            </div>
            
            <h3 className="font-heading font-black text-lg uppercase mb-2 text-white">Purge Entry?</h3>
            <p className="font-mono text-ash text-xs mb-6">
              This action is permanent and cannot be reversed. This registration log will be wiped.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setDeletingId(null)}
                className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-xs py-3 uppercase hover:bg-white hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 bg-blood text-white font-mono text-xs py-3 uppercase hover:bg-white hover:text-black transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
