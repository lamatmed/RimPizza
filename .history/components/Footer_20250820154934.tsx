"use client";

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Restez informés</h3>
            <p className="text-sm text-muted-foreground">
              Abonnez-vous à notre newsletter pour recevoir les dernières offres et mises à jour.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Entrez votre e-mail"
                className="bg-background"
              />
              <Button type="submit">S'abonner</Button>
            </form>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Support client */}
          <div>
            <h3 className="font-bold text-lg mb-4">Service client</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#">Centre d'aide</Link>
              </li>
              <li>
                <Link href="#">Suivre ma commande</Link>
              </li>
              <li>
                <Link href="#">Politique de retour</Link>
              </li>
              <li>
                <Link href="#">Expédition et livraison</Link>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#">À propos de nous</Link>
              </li>
              <li>
                <Link href="#">Notre menu</Link>
              </li>
              <li>
                <Link href="#">Promotions</Link>
              </li>
              <li>
                <Link href="#">Carrières</Link>
              </li>
            </ul>
          </div>

          {/* Contact et badges */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contactez-nous</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Téléphone : +1 (555) 123-PIZZA</p>
              <p>Email : hello@sahand.com</p>
              <p>Adresse : 123 Rue Pizza, Rome, Italie</p>
            </div>
            <div className="pt-4">
              <h4 className="font-medium mb-2">Achats sécurisés</h4>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-background rounded flex items-center justify-center text-xs">
                  Visa
                </div>
                <div className="h-8 w-12 bg-background rounded flex items-center justify-center text-xs">
                  MasterCard
                </div>
                <div className="h-8 w-12 bg-background rounded flex items-center justify-center text-xs">
                  PayPal
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t mt-8 pt-8 text-sm text-muted-foreground text-center">
          <p>© 2024 Sahand Pizza. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
